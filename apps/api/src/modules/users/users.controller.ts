import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { User } from './entities/user.entity';
import {
  ApiResponseMany,
  ApiResponseOne,
  ResponseOneDto,
  ResponseManyDto,
} from '../../common/dto/response.dto';
import { ApiUsersEnum } from '@libs/constant';

@ApiTags('users')
@ApiBearerAuth()
@ApiExtraModels(ResponseOneDto, ResponseManyDto, User)
@Controller({
  path: 'users',
  version: VERSION_NEUTRAL,
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponseOne(User, ApiCreatedResponse)
  async create(@Body() createUserDto: CreateUserDto) {
    const [status, data] = await this.userService.create({ ...createUserDto });
    return {
      statusCode: HttpStatus.CREATED,
      message: [`${ApiUsersEnum.create}_${status}`],
      data,
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponseMany(User, ApiOkResponse)
  findAll(): Promise<ResponseManyDto<User>> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by {:id}' })
  @ApiResponseOne(User, ApiOkResponse)
  async findById(@Param('id') id: string): Promise<ResponseOneDto<User>> {
    const user = await this.userService.findOne({ id });
    return {
      statusCode: HttpStatus.OK,
      message: ['GET_USER_BY_ID_SUCCESS'],
      data: user,
    };
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get user by {:username}' })
  @ApiResponseOne(User, ApiOkResponse)
  async findByUsername(
    @Param('username') username: string,
  ): Promise<ResponseOneDto<User>> {
    const user = await this.userService.findOne({ username });
    return {
      statusCode: HttpStatus.OK,
      message: ['GET_USER_BY_USERNAME_SUCCESS'],
      data: user,
    };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch user by {:id}' })
  async patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.patch(id, updateUserDto);

    return {
      statusCode: HttpStatus.OK,
      message: ['UPDATE_USER_BY_ID_SUCCESS'],
      data: user,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string) {
    const [status, user] = await this.userService.remove(id);
    return {
      statusCode: HttpStatus.OK,
      message: [`DELETE_USER_BY_ID_${status}`],
      data: user,
    };
  }
}
