import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { RecipeType } from './recipe-type.entity';

export type A = {
  a: string;
};

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ example: 'b828ef62-8502-4007-86be-4633bb194840' })
  id: string;

  @Column({ unique: true })
  @Index({ unique: true })
  @IsNotEmpty()
  @ApiProperty({ example: 'Snow Block' })
  name: string;

  @Column({ nullable: true })
  @ApiProperty({ example: 'A snow block is a full-sized block of snow.' })
  desc?: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({
    example:
      'If mined with a Silk Touch enchanted shovel, snow blocks drop themselves; without the enchantment, 4 snowballs are dropped instead. Nothing drops if mined with any other tool, even if enchanted with Silk Touch',
  })
  obtaining?: string;

  @ManyToOne(() => RecipeType, (recipeType) => recipeType.recipes)
  recipeType: RecipeType;

  @ManyToMany(() => Recipe, (recipe) => recipe.obtainFrom)
  @JoinTable({
    name: 'recipe_usefor_recipe',
    joinColumn: { name: 'obtainFrom', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'recipeOf', referencedColumnName: 'id' },
  })
  @ApiProperty({ example: ['<Recipe>', '<Recipe>'] })
  recipeOf: Recipe[];

  @ManyToMany(() => Recipe, (recipe) => recipe.recipeOf)
  obtainFrom: Recipe[];

  @CreateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @ApiProperty({ example: '2022-04-07 15:06:28.475' })
  updatedAt: Date;
}
