import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { permissionEnum } from '../../../common/constants/enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_username>',
  })
  readonly username: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_email>',
  })
  readonly email: string;

  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({
    example: '<your_password>',
    nullable: true,
  })
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: '<your_name>',
  })
  readonly name: string;
}
