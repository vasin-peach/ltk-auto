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
    const data = await this.userService.create({ ...createUserDto });
    return { data };
  }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiResponseMany(User, ApiOkResponse)
  async findAll() {
    const [data, meta] = await this.userService.findAll();
    return { data, meta };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by {:id}' })
  @ApiResponseOne(User, ApiOkResponse)
  async findById(@Param('id') id: string) {
    const data = await this.userService.findOne({ id });
    return { data };
  }

  @Get('username/:email')
  @ApiOperation({ summary: 'Get user by {:email}' })
  @ApiResponseOne(User, ApiOkResponse)
  async findByEmail(@Param('email') email: string) {
    const data = await this.userService.findOne({ email });
    return { data };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Patch user by {:id}' })
  async patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.patch(id, updateUserDto);
    return { data };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string) {
    const data = await this.userService.remove(id);
    return { data };
  }
}
