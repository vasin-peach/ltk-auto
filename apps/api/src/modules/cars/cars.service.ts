import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { MetaDto } from 'src/common/dto/response.dto'
import { FindOptionsWhere, Repository } from 'typeorm'
import { BrandsService } from '../brand/brands.service'
import { Brand } from '../brand/entities/brand'
import { CreateCarDto } from './dto/create.dto'
import { UpdateCarDto } from './dto/update.dto'
import { Car } from './entities/car'

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(Car)
    private carsRepository: Repository<Car>,
    private brandsService: BrandsService,
  ) {}

  async create(createDto: CreateCarDto) {
    const brand = await this.brandsService.findOne({
      name: createDto.brand as any,
    })

    if (!brand)
      throw new NotFoundException({
        error: [`brand name ${createDto.brand} is not exist.`],
      })

    const data = await this.carsRepository.save({ ...createDto, brand: brand })
    return data
  }

  async findAll(meta?: MetaDto) {
    if (!meta) {
      const [data, total] = await Promise.all([
        this.carsRepository.find(),
        this.carsRepository.count(),
      ])

      const metadata = { total }

      return [data, metadata]
    }

    const queryBuilder = this.carsRepository.createQueryBuilder('car')
    queryBuilder.skip(meta.page * meta.offset).take(meta.offset) // build pagination builder

    const [data, total] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount(),
    ])

    const metadata = { ...meta, total }

    return [data, metadata] as const
  }

  async findOne(query: FindOptionsWhere<Car> | FindOptionsWhere<Car>[]) {
    return await this.carsRepository.findOneBy(query)
  }

  async patch(id: string, updateUserDto: UpdateCarDto) {
    return await this.carsRepository.save({ ...updateUserDto, id })
  }

  async remove(id: string) {
    const user = await this.findOne({ id })
    if (!user) return user
    return await this.carsRepository.remove(user)
  }
}
