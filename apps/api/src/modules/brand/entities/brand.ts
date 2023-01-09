import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'
import { Car } from 'src/modules/cars/entities/car'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm'

@Entity()
export class Brand {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b828ef62-8502-4007-86be-4633bb194840' })
  id?: string

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: '<brand_name>', uniqueItems: true })
  @Column({ unique: true })
  name: string

  @Column()
  @IsNotEmpty()
  @ApiProperty({ example: '<brand_image>' })
  image: string

  @OneToMany(() => Car, (car) => car.brand)
  cars: Car[]

  @CreateDateColumn()
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  createdAt?: Date

  @UpdateDateColumn()
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  updatedAt?: Date
}
