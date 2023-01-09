import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  NotFoundException,
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
  ApiResponseMany,
  ApiResponseOne,
  ResponseOneDto,
  ResponseManyDto,
} from '../../common/dto/response.dto'
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { RoleEnum } from '@libs/constant'
import { Role } from '../auth/decorators/roles.decorator'
import { RoleGuard } from '../auth/guards/role.guard'
import { Brand } from './entities/brand'
import { BrandsService } from './brands.service'
import { CreateBrandDto } from './dto/create.dto'
import { UpdateBrandDto } from './dto/update.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { UploadBrandDto } from './dto/upload.dto'
import { StorageService } from '../storage/storage.service'
import { diskStorage } from 'multer'
import { extname } from 'path'
import gcloudConstant from '@libs/constant/src/gcloud.constant'

const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0]
  const fileExtName = extname(file.originalname)
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('')
  callback(null, `${name}-${randomName}${fileExtName}`)
}

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false)
  }
  callback(null, true)
}

@ApiTags('brands')
@ApiExtraModels(ResponseOneDto, ResponseManyDto, Brand)
@Controller({
  path: 'brands',
  version: VERSION_NEUTRAL,
})
export class BrandsController {
  constructor(
    private readonly brandsService: BrandsService,
    private readonly storageService: StorageService,
  ) {}

  /* --------------------------------- Create --------------------------------- */
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MAINTAINER)
  @ApiOperation({ summary: 'Create brand' })
  @ApiResponseOne(Brand, ApiCreatedResponse)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({
            fileType: /[\/.](gif|jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Body() createDto: CreateBrandDto,
  ) {
    const publicUrl = await this.storageService
      .uploadImage(createDto.name, gcloudConstant.storage.bucket.brand, image)
      .catch((e: any) => {
        throw new BadRequestException({
          error: e.message || e.error[0].errors,
          errorCode: e.code,
        })
      })

    const data = await this.brandsService.create({
      ...createDto,
      image: publicUrl,
    })
    return { data }
  }

  /* -------------------------------- Find All -------------------------------- */
  @Get()
  @ApiOperation({ summary: 'Get brands' })
  @ApiResponseMany(Brand, ApiOkResponse)
  async findAll() {
    const [data, meta] = await this.brandsService.findAll()
    return { data, meta }
  }

  /* ------------------------------- Find By Id ------------------------------- */
  @Get(':id')
  @ApiOperation({ summary: 'Get brand by {:id}' })
  @ApiResponseOne(Brand, ApiOkResponse)
  async findById(@Param('id') id: string) {
    const data = await this.brandsService.findOne({ id })
    return { data }
  }

  /* --------------------------------- Update --------------------------------- */
  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Role(RoleEnum.MAINTAINER)
  @ApiOperation({ summary: 'Patch brand by {:id}' })
  @UseInterceptors(FileInterceptor('image'))
  async patch(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2000000 }),
          new FileTypeValidator({
            fileType: /[\/.](gif|jpg|jpeg|png|webp)$/i,
          }),
        ],
      }),
    )
    image: Express.Multer.File,
    @Body() updateDto: UpdateBrandDto,
  ) {
    let publicUrl

    // Check giving brand is exist
    const exist = await this.brandsService.findOne({ id })
    if (!exist) throw new NotFoundException()

    // Remove old image if giving url or upload image
    if (image || updateDto.image) {
      {
        await this.storageService
          .removeImage(
            exist.image.split('/').pop(),
            gcloudConstant.storage.bucket.brand,
          )
          .catch((e: any) => {
            throw new BadRequestException({
              error: e.message || e.error[0].errors,
              errorCode: e.code,
            })
          })
      }
    }

    // If Upload image
    if (image) {
      publicUrl = await this.storageService
        .uploadImage(updateDto.name, gcloudConstant.storage.bucket.brand, image)
        .catch((e: any) => {
          throw new BadRequestException({
            error: e.message || e.error[0].errors,
            errorCode: e.code,
          })
        })
    }

    // Update
    const data = await this.brandsService.patch(id, {
      ...updateDto,
      image: publicUrl || updateDto.image,
    })
    return { data }
  }

  /* --------------------------------- Remove --------------------------------- */
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.MAINTAINER)
  @ApiOperation({ summary: 'Delete brand' })
  async remove(@Param('id') id: string) {
    const data = await this.brandsService.remove(id)
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
