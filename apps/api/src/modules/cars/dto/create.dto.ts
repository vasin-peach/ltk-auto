import { CarBody, CarCondition, CarFuel } from '@libs/constant'
import { ApiProperty } from '@nestjs/swagger'
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator'
import { Brand } from 'src/modules/brand/entities/brand'

export class CreateCarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    example: '<name>',
  })
  name: string

  @IsEnum(CarCondition)
  @IsOptional()
  @ApiProperty({ example: '<รถใหม่>', enum: CarCondition })
  condition?: CarCondition

  image?: string
  previewImages?: string[]

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '<mazda>' })
  brand?: Brand

  // GENERAL
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '<2018>' })
  year: string

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 4 })
  door?: number

  @IsNumber()
  @IsOptional()
  @ApiProperty({ example: 5 })
  seat?: number

  @IsEnum(CarBody)
  @IsOptional()
  @ApiProperty({ example: '<ซีดาน>', enum: CarBody })
  body?: CarBody

  // ENGINE SPECIFICATIONS
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '<เกียร์ออโต้>' })
  transmission: string

  @IsEnum(CarFuel)
  @IsOptional()
  @ApiProperty({ example: '<เบนซิน>', enum: CarFuel })
  fuel?: CarFuel

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '<แถวเรียง 4 สูบ วางตามขวาง>' })
  engineType?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '<16 Valve DOHC Skyactiv-G>' })
  engineName?: string

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1497 })
  engineCc?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 88 })
  peakPower?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 131 })
  peakTorque?: number

  // DIMENSIONS & WEIGHT
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 4310 })
  lengthMm?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1690 })
  widthMm?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1485 })
  heightMm?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1440 })
  frontThread?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1440 })
  rearThread?: number

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 42 })
  fuelTank?: number

  // TYRES & WHEELS
  @IsOptional()
  @IsString()
  @ApiProperty({ example: '<185/55 R15>' })
  frontTyre?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '<185/55 R15>' })
  rearTyre?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '<15x6>' })
  frontRim?: string

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '<15x6>' })
  rearRim?: string
}
