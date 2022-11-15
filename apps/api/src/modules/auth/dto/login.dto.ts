import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    uniqueItems: true,
    example: '<your_username>',
  })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({
    example: '<your_password>',
  })
  readonly password: string;
}
