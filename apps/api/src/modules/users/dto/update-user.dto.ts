import { RoleEnum } from '@libs/constant'
import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator'

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_email>',
    nullable: true,
  })
  readonly email?: string

  @IsOptional()
  @ApiProperty({
    example: '<your_password>',
    nullable: true,
  })
  readonly password?: string

  @IsOptional()
  @IsEnum(RoleEnum)
  @ApiProperty({
    example: '<your_role>',
    nullable: true,
    enum: RoleEnum,
  })
  readonly role?: RoleEnum

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '<your_name>',
  })
  readonly name: string
}
