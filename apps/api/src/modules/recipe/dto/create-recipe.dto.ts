import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Recipe } from '../entities/recipe.entity';

export class CreateRecipeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Snow Block',
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'A snow block is a full-sized block of snow.',
  })
  readonly desc?: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example:
      'If mined with a Silk Touch enchanted shovel, snow blocks drop themselves; without the enchantment, 4 snowballs are dropped instead. Nothing drops if mined with any other tool, even if enchanted with Silk Touch',
  })
  readonly obtaining?: string;

  @IsOptional()
  @IsArray()
  @ApiProperty({
    example: ['<Recipe>', '<Recipe>'],
  })
  readonly recipeOf?: Recipe[];
}
