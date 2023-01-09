import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'
import { CreateBrandDto } from './dto/create.dto'
import { UpdateBrandDto } from './dto/update.dto'
import { Brand } from './entities/brand'
import { StorageService } from '../storage/storage.service'

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(Brand)
    private readonly brandsRepository: Repository<Brand>,
    private readonly storageService: StorageService,
  ) {}

  async create(createDto: CreateBrandDto) {
    const data = await this.brandsRepository.save({ ...createDto })
    return data
  }

  async findAll() {
    const queryBuilder = this.brandsRepository.createQueryBuilder('brand')
    const [data] = await Promise.all([queryBuilder.getMany()])
    return data
  }

  async findOne(query: FindOptionsWhere<Brand> | FindOptionsWhere<Brand>[]) {
    return await this.brandsRepository.findOneBy(query)
  }

  async patch(id: string, updateUserDto: UpdateBrandDto) {
    return await this.brandsRepository.save({ id: id, ...updateUserDto })
  }

  async remove(id: string) {
    const resp = await this.findOne({ id })
    if (!resp) return resp
    return await this.brandsRepository.remove(resp)
  }
}
