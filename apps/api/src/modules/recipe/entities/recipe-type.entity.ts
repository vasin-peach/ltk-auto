import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity()
export class RecipeType {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b828ef62-8502-4007-86be-4633bb194840' })
  id: string;

  @Column({ unique: true })
  @Index({ unique: true })
  @IsNotEmpty()
  @ApiProperty({ example: 'crafting_shaped' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({
    example: 'Represents a shaped crafting recipe in a crafting table.',
  })
  desc?: string;

  @OneToMany(() => Recipe, (recipe) => recipe.recipeType)
  recipes: Recipe[];

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  updatedAt: Date;
}
