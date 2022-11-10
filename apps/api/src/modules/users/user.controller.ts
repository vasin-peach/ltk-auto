import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { UserService } from './user.service';
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

@ApiTags('user')
@ApiBearerAuth()
@ApiExtraModels(ResponseOneDto, ResponseManyDto, User)
@Controller({
  path: 'user',
  version: VERSION_NEUTRAL,
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponseOne(User, ApiCreatedResponse)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user' })
  @ApiResponseMany(User, ApiOkResponse)
  findAll(): Promise<ResponseManyDto<User>> {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponseOne(User, ApiOkResponse)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
