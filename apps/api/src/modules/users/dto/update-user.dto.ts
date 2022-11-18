import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { roleEnum } from '../../../common/constants/enum';

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
  @IsEnum(roleEnum)
  @ApiProperty({
    example: '<your_role>',
    nullable: true,
    enum: roleEnum,
  })
  readonly role?: roleEnum;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '<your_name>',
  })
  readonly name: string;
}
