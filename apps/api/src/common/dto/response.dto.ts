import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiProperty,
  ApiResponseOptions,
  getSchemaPath,
  PickType,
} from '@nestjs/swagger';

export class ResponseMetaDto {
  @ApiProperty({ example: 100, minimum: 1 })
  total: number;

  @ApiProperty({ example: 1, minimum: 1 })
  page: number;

  @ApiProperty({ example: 10, minimum: 1, maximum: 100 })
  offset: number;

  @ApiProperty({ example: false })
  hasPrevPage?: boolean;

  @ApiProperty({ example: true })
  hasNextPage?: boolean;
}

export class MetaDto extends PickType(ResponseMetaDto, ['page', 'offset']) {}

export class ResponseManyDto<TData> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ isArray: true, example: ['<message>'] })
  message: string[];

  @ApiProperty({ nullable: true, example: '<error message>' })
  error?: string;

  @ApiProperty({ nullable: true, type: ResponseMetaDto })
  meta?: ResponseMetaDto;

  data: TData[];
}

export class ResponseOneDto<TData> {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ isArray: true, example: ['<message>'] })
  message: string[];

  @ApiProperty({ nullable: true, example: '<error message>' })
  error?: string;

  data: TData;
}

export const ApiResponseMany = <TModel extends Type<any>>(
  model: TModel,
  ResponseFunction: (
    options: ApiResponseOptions,
  ) => MethodDecorator & ClassDecorator,
) => {
  return applyDecorators(
    ResponseFunction({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseManyDto) },
          { properties: { data: { items: { $ref: getSchemaPath(model) } } } },
        ],
      },
    }),
  );
};

export const ApiResponseOne = <TModel extends Type<any>>(
  model: TModel,
  ResponseFunction: (
    options: ApiResponseOptions,
  ) => MethodDecorator & ClassDecorator,
) => {
  return applyDecorators(
    ResponseFunction({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseOneDto) },
          { properties: { data: { $ref: getSchemaPath(model) } } },
        ],
      },
    }),
  );
};
