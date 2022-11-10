import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateRecipeTypeDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'crafting_shaped',
  })
  readonly name: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Represents a shaped crafting recipe in a crafting table.',
  })
  readonly desc?: string;
}
