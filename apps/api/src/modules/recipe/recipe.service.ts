import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseOneDto } from '../../common/dto/response.dto';
import { Repository } from 'typeorm';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { Recipe } from './entities/recipe.entity';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  async create(createDto: CreateRecipeDto): Promise<ResponseOneDto<Recipe>> {
    // create parent recipe
    const recipe = this.recipeRepository.create(createDto);

    // check is recipe contain `useFor`
    if (createDto.recipeOf) {
      const useFor = await this.recipeRepository.save(createDto.recipeOf);
      recipe.recipeOf = useFor; // save and assign to recipe.useFor
    }

    const data = await this.recipeRepository.save(recipe);

    return {
      statusCode: HttpStatus.CREATED,
      message: ['CREATE_RECIPE_SUCCESS'],
      data,
    };
  }

  async findOne(id: string) {
    return await this.recipeRepository.findOne({ where: { id } });
  }

  async findMany(id: string) {
    return await this.recipeRepository.find({ where: { id } });
  }

  // update(id: number, updateRecipeDto: UpdateRecipeDto) {
  //   return `This action updates a #${id} recipe`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} recipe`;
  // }
}
