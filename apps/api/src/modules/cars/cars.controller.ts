import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  VERSION_NEUTRAL,
  UseGuards,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  BadGatewayException,
  NotFoundException,
  Delete,
} from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger'

import {
  ApiResponseOne,
  ResponseOneDto,
  ResponseManyDto,
} from '../../common/dto/response.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleEnum } from '@libs/constant'
import { Role } from '../auth/decorators/roles.decorator'
import { RoleGuard } from '../auth/guards/role.guard'
import { FileFieldsInterceptor } from '@nestjs/platform-express'
import { StorageService } from '../storage/storage.service'
import gcloudConstant from '@libs/constant/src/gcloud.constant'
import { Car } from './entities/car'
import { CarsService } from './cars.service'
import { CreateCarDto } from './dto/create.dto'
import path from 'path'
import { UpdateCarDto } from './dto/update.dto'
import { BrandsService } from '../brand/brands.service'

@ApiTags('cars')
@ApiExtraModels(ResponseOneDto, ResponseManyDto, Car)
@Controller({
  path: 'cars',
  version: VERSION_NEUTRAL,
})
export class CarsController {
  constructor(
    private readonly carsService: CarsService,
    private readonly storageService: StorageService,
    private readonly brandsService: BrandsService,
  ) {}

  /* --------------------------------- Create --------------------------------- */
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MAINTAINER)
  @ApiOperation({ summary: 'Create car' })
  @ApiResponseOne(Car, ApiCreatedResponse)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'previewImages', maxCount: 10 },
    ]),
  )
  async create(
    // https://github.com/nestjs/docs.nestjs.com/issues/2424
    @UploadedFiles()
    files: {
      image: Express.Multer.File[]
      previewImages: Express.Multer.File[]
    },
    @Body()
    createDto: CreateCarDto,
  ) {
    // Validate file type
    const handleFilterImage = (files: Express.Multer.File[]) => {
      return files.find((file) =>
        path.extname(file.originalname).match(/[\/.](gif|jpg|jpeg|png|webp)$/i),
      )
        ? true
        : false
    }

    if (
      !handleFilterImage(files.image) ||
      !handleFilterImage(files.previewImages)
    )
      throw new BadRequestException({
        error: ['image extension is not correct'],
      })

    const [imageUrl, previewUrls] = await Promise.all([
      this.storageService.uploadImage(
        createDto.name,
        gcloudConstant.storage.bucket.car,
        files.image[0],
      ),
      this.storageService.uploadMultipleImage(
        createDto.name,
        gcloudConstant.storage.bucket.car,
        files.previewImages,
      ),
    ]).catch((e: any) => {
      throw new BadGatewayException({ error: [e.message || e] })
    })

    // Save to db
    const data = await this.carsService
      .create({
        ...createDto,
        image: imageUrl,
        previewImages: previewUrls,
      })
      .catch(async (e) => {
        // If failed remove image
        await this.storageService.removeMultipleImage(
          [imageUrl, ...previewUrls],
          gcloudConstant.storage.bucket.car,
        )

        new BadGatewayException({ error: [e.message || e] })
      })

    return { data }
  }

  // /* -------------------------------- Find All -------------------------------- */
  // @Get()
  // @ApiOperation({ summary: 'Get brands' })
  // @ApiResponseMany(Brand, ApiOkResponse)
  // async findAll() {
  //   const [data, meta] = await this.brandsService.findAll()
  //   return { data, meta }
  // }

  // /* ------------------------------- Find By Id ------------------------------- */
  @Get(':id')
  @ApiOperation({ summary: 'Get car by {:id}' })
  @ApiResponseOne(Car, ApiOkResponse)
  async findById(@Param('id') id: string) {
    const data = await this.carsService.findOne({ id })
    return { data }
  }

  // /* --------------------------------- Update --------------------------------- */
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MAINTAINER)
  @ApiOperation({ summary: 'Update car' })
  @ApiResponseOne(Car, ApiCreatedResponse)
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'previewImages', maxCount: 10 },
    ]),
  )
  async patch(
    @Param('id') id: string,
    @Body() updateDto: UpdateCarDto,
    @UploadedFiles()
    files: {
      image: Express.Multer.File[]
      previewImages: Express.Multer.File[]
    },
  ) {
    // Validate car id
    const car = await this.carsService.findOne({ id })
    if (!car) throw new NotFoundException()

    // Check giving brand is exist
    if (updateDto.brand) {
      const brand = await this.brandsService.findOne({
        name: updateDto.brand as any,
      })
      updateDto.brand = brand

      if (!brand)
        throw new NotFoundException({
          error: [`brand name ${updateDto.brand} is not exist.`],
        })
    }

    // Remove old image if giving url or upload image
    if (files.image || files.previewImages || updateDto.image) {
      const removeImageNames = []

      // assign to remove list if giving image is different from car
      if (updateDto.image || files.image) removeImageNames.push(car.image)

      // assign to remove list if giving previewImages is different from car
      if (updateDto.previewImages) {
        removeImageNames.push(
          ...car.previewImages.filter(
            (i) => !updateDto.previewImages.includes(i),
          ),
        )
      }

      if (removeImageNames.length) {
        await this.storageService
          .removeMultipleImage(
            removeImageNames.filter((i) => i),
            gcloudConstant.storage.bucket.car,
          )
          .catch((e) => {
            throw new BadGatewayException({
              error: [e.message || e],
            })
          })
      }
    }

    // Update image
    if (files.image) {
      updateDto.image = await this.storageService.uploadImage(
        updateDto.name,
        gcloudConstant.storage.bucket.car,
        files.image[0],
      )
    }

    if (files.previewImages) {
      updateDto.previewImages = await this.storageService.uploadMultipleImage(
        updateDto.name,
        gcloudConstant.storage.bucket.car,
        files.previewImages,
      )
    }

    // Update
    const data = await this.carsService.patch(id, {
      ...updateDto,
    })
    return { data }
  }

  /* --------------------------------- Remove --------------------------------- */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MAINTAINER)
  @ApiOperation({ summary: 'Delete car' })
  async remove(@Param('id') id: string) {
    const data = await this.carsService.remove(id)
    if (!data) throw new NotFoundException()

    await this.storageService
      .removeImage(
        data.image.split('/').pop(),
        gcloudConstant.storage.bucket.brand,
      )
      .catch((e: any) => {
        throw new BadRequestException({
          error: e.message || e.error[0].errors,
          errorCode: e.code,
        })
      })

    return { data }
  }
}
