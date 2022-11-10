import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeType } from './entities/recipe-type.entity';
import { Recipe } from './entities/recipe.entity';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';

@Module({
  imports: [TypeOrmModule.forFeature([Recipe, RecipeType])],
  controllers: [RecipeController],
  providers: [RecipeService],
})
export class RecipeModule {}
