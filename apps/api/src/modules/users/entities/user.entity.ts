import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { permissionEnum } from '../../../common/constants/enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b828ef62-8502-4007-86be-4633bb194840' })
  id: string;

  @Column({ unique: true })
  @ApiProperty({ example: '<email>' })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ type: 'enum', enum: permissionEnum, default: permissionEnum.GUEST })
  @ApiProperty({ example: '<permission>' })
  permission: permissionEnum;

  @Column()
  @ApiProperty({ example: '<name>' })
  name: string;

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  updatedAt: Date;
}
