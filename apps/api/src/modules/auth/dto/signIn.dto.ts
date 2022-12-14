import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, Matches } from 'class-validator'

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_email>',
  })
  readonly email: string

  @IsNotEmpty()
  @ApiProperty({
    example: '<your_password>',
  })
  readonly password: string
}
