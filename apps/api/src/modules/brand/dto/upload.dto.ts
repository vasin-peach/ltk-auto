import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class UploadBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '<mazda>' })
  name: string
}
