import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateBrandDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '<brand_name>', uniqueItems: true })
  name: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '<brand_image>', nullable: true })
  image?: string
}
