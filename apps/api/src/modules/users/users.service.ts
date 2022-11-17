import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaDto, ResponseManyDto } from '../../common/dto/response.dto';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { ApiStatusEnum } from '@libs/constant';
import { permissionEnum } from '../../common/constants/enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = await this.usersRepository.save({
      ...createUserDto,
      permission: permissionEnum.GUEST,
    });
    return data;
  }

  async findAll(meta?: MetaDto) {
    if (!meta) {
      const [data, total] = await Promise.all([
        this.usersRepository.find(),
        this.usersRepository.count(),
      ]);

      const metadata = { total };

      return [data, metadata];
    }

    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.skip(meta.page * meta.offset).take(meta.offset); // build pagination builder

    const [data, total] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount(),
    ]);

    const metadata = { ...meta, total };

    return [data, metadata] as const;
  }

  async findOne(query: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
    return await this.usersRepository.findOneBy(query);
  }

  async patch(id: string, updateUserDto: UpdateUserDto) {
    return await this.usersRepository.save({ ...updateUserDto, id });
  }

  async remove(id: string) {
    const user = await this.findOne({ id });
    if (!user) return user;
    return await this.usersRepository.remove(user);
  }
}
