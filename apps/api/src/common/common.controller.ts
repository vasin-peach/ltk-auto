import {
  Controller,
  Get,
  HttpStatus,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { ResponseInterceptor } from '../interceptors/response.interceptor';
import { ApiResponseOne, ResponseOneDto } from './dto/response.dto';

class Healthy {
  readonly statusCode: number;
  readonly error: null;
}

@ApiTags('common')
@ApiExtraModels(ResponseOneDto, Healthy)
@Controller({
  path: '',
  version: VERSION_NEUTRAL,
})
export class CommonController {
  @Get()
  @ApiResponseOne(Healthy, ApiOkResponse)
  @ApiOperation({ summary: 'Healthy Check' })
  async healthy() {
    return {
      statusCode: HttpStatus.OK,
      error: null,
      errorCode: null,
      data: null,
      message: 'HEALTHY',
      timestamp: new Date().toISOString(),
    };
  }
}
