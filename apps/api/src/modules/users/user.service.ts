import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  MetaDto,
  ResponseManyDto,
  ResponseOneDto,
} from '../../common/dto/response.dto';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(createUserDto: CreateUserDto): ResponseOneDto<User> {
    const data = this.usersRepository.create(createUserDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: ['CREATE_USER_SUCCESS'],
      data,
    };
  }

  async findAll(meta?: MetaDto): Promise<ResponseManyDto<User>> {
    if (!meta)
      return {
        statusCode: HttpStatus.OK,
        message: ['GET USERS SUCCESS'],
        data: await this.usersRepository.find(),
      };

    const queryBuilder = this.usersRepository.createQueryBuilder('user');
    queryBuilder.skip(meta.page * meta.offset).take(meta.offset); // build pagination builder

    const [data, total] = await Promise.all([
      queryBuilder.getMany(),
      queryBuilder.getCount(),
    ]);

    return {
      statusCode: HttpStatus.OK,
      message: ['GET_USER_SUCCESS', 'PAGINATION'],
      data,
      meta: {
        ...meta,
        total,
      },
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
