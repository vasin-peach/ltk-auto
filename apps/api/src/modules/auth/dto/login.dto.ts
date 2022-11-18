import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_email>',
  })
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '<your_password>',
  })
  readonly password: string;
}
