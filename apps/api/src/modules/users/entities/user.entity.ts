import { RoleEnum } from '@libs/constant'
import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b828ef62-8502-4007-86be-4633bb194840' })
  id?: string

  @Column({ unique: true })
  @ApiProperty({ example: '<email>' })
  email: string

  @Exclude()
  @Column({ nullable: true })
  password?: string

  @Column({ type: 'smallint', default: RoleEnum.MEMBER })
  @ApiProperty({ example: '<role>' })
  role: RoleEnum

  @Column()
  @ApiProperty({ example: '<name>' })
  name: string

  @Column({ nullable: true })
  @ApiProperty({ example: '<image>' })
  image?: string

  @CreateDateColumn()
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  createdAt?: Date

  @UpdateDateColumn()
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  updatedAt?: Date
}
