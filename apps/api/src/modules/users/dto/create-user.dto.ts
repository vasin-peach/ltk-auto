import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
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
