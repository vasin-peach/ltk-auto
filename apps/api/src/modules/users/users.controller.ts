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
  Req,
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
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RoleEnum } from '@libs/constant';
import { Role } from '../auth/decorators/roles.decorator';
import { RoleGuard } from '../auth/guards/role.guard';

@ApiTags('users')
@ApiBearerAuth()
@ApiExtraModels(ResponseOneDto, ResponseManyDto, User)
@Controller({
  path: 'users',
  version: VERSION_NEUTRAL,
})
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get my user profile' })
  @ApiResponseOne(User, ApiOkResponse)
  async me(@Req() req) {
    return { data: req.user };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Create user' })
  @ApiResponseOne(User, ApiCreatedResponse)
  async create(@Body() createUserDto: CreateUserDto) {
    const data = await this.userService.create({ ...createUserDto });
    return { data };
  }

  @Get()
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Get users' })
  @ApiResponseMany(User, ApiOkResponse)
  async findAll() {
    const [data, meta] = await this.userService.findAll();
    return { data, meta };
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by {:id}' })
  @ApiResponseOne(User, ApiOkResponse)
  async findById(@Param('id') id: string) {
    const data = await this.userService.findOne({ id });
    return { data };
  }

  @Get('username/:email')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Get user by {:email}' })
  @ApiResponseOne(User, ApiOkResponse)
  async findByEmail(@Param('email') email: string) {
    const data = await this.userService.findOne({ email });
    return { data };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Patch user by {:id}' })
  async patch(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const data = await this.userService.patch(id, updateUserDto);
    return { data };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Role(RoleEnum.ADMIN)
  @ApiOperation({ summary: 'Delete user' })
  async remove(@Param('id') id: string) {
    const data = await this.userService.remove(id);
    return { data };
  }
}
