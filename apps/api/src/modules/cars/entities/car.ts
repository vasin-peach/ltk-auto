import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { Brand } from 'src/modules/brand/entities/brand'
import { CarCondition, CarFuel, CarBody } from '@libs/constant'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm'

@Entity()
export class Car {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b828ef62-8502-4007-86be-4633bb194840' })
  id?: string

  @Column()
  @ApiProperty({ example: '<name>' })
  name: string

  @Column({ type: 'varchar', default: CarCondition.NEW })
  @ApiProperty({ example: 'รถใหม่' })
  condition: CarCondition

  @Column({ type: 'text' })
  @ApiProperty({ example: '<url>' })
  image: string

  @Column({ type: 'text', array: true })
  @ApiProperty({ example: ['<url>', '<url>'] })
  previewImages: string[]

  @ManyToOne(() => Brand, (brand) => brand.cars)
  @ApiProperty({ example: 'mazda' })
  brand: Brand

  // GENERAL
  @Column()
  @ApiProperty({ example: '<2018>' })
  year: string

  @Column({ default: 4 })
  @ApiProperty({ example: 4 })
  door?: number

  @Column({ default: 5 })
  @ApiProperty({ example: 5 })
  seat?: number

  @Column({ type: 'varchar', default: CarBody.SEDAN })
  @ApiProperty({ example: '<ซีดาน>' })
  body?: CarBody

  // ENGINE SPECIFICATIONS
  @Column()
  @ApiProperty({ example: '<เกียร์ออโต้>' })
  transmission: string

  @Column({ type: 'varchar', default: CarFuel.BENZENE })
  @ApiProperty({ example: '<เบนซิน>' })
  fuel?: CarFuel

  @Column({ nullable: true })
  @ApiProperty({ example: '<แถวเรียง 4 สูบ วางตามขวาง>' })
  engineType?: string

  @Column({ nullable: true })
  @ApiProperty({ example: '<16 Valve DOHC Skyactiv-G>' })
  engineName?: string

  @Column({ nullable: true })
  @ApiProperty({ example: 1497 })
  engineCc?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 88 })
  peakPower?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 131 })
  peakTorque?: number

  // DIMENSIONS & WEIGHT
  @Column({ nullable: true })
  @ApiProperty({ example: 4310 })
  lengthMm?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 1690 })
  widthMm?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 1485 })
  heightMm?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 1440 })
  frontThread?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 1440 })
  rearThread?: number

  @Column({ nullable: true })
  @ApiProperty({ example: 42 })
  fuelTank?: number

  // TYRES & WHEELS
  @Column({ nullable: true })
  @ApiProperty({ example: '<185/55 R15>' })
  frontTyre?: string

  @Column({ nullable: true })
  @ApiProperty({ example: '<185/55 R15>' })
  rearTyre?: string

  @Column({ nullable: true })
  @ApiProperty({ example: '<15x6>' })
  frontRim?: string

  @Column({ nullable: true })
  @ApiProperty({ example: '<15x6>' })
  rearRim?: string

  @CreateDateColumn()
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  createdAt?: Date

  @UpdateDateColumn()
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  updatedAt?: Date
}
