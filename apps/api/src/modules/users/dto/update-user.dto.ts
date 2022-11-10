import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { permissionEnum } from '../../../common/constants/enum';
import { User } from '../entities/user.entity';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_email>',
    nullable: true,
  })
  readonly email?: string;

  @IsOptional()
  @ApiProperty({
    example: '<your_password>',
    nullable: true,
  })
  readonly password?: string;

  @IsOptional()
  @IsEnum(permissionEnum)
  @ApiProperty({
    example: '<your_permission>',
    nullable: true,
    enum: permissionEnum,
  })
  readonly permission?: permissionEnum;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '<your_name>',
  })
  readonly name: string;
}
