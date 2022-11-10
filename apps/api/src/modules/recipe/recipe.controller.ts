import { Body, Controller, Post, VERSION_NEUTRAL } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  ApiResponseOne,
  ResponseManyDto,
  ResponseOneDto,
} from 'src/common/dto/response.dto';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entities/recipe.entity';
import { RecipeService } from './recipe.service';

@ApiTags('recipe')
@ApiBearerAuth()
@ApiExtraModels(ResponseOneDto, ResponseManyDto, Recipe)
@Controller({
  path: 'recipe',
  version: VERSION_NEUTRAL,
})
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Post()
  @ApiOperation({ summary: 'Create recipe' })
  @ApiResponseOne(Recipe, ApiCreatedResponse)
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
}
