import {
  Controller,
  Get,
  HttpStatus,
  UseInterceptors,
  VERSION_NEUTRAL,
} from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger'
import { ApiResponseOne, ResponseOneDto } from './dto/response.dto'

class Healthy {
  @ApiProperty({ example: 'Healthy' })
  readonly data: string
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
      data: { data: 'HEALTHY' },
      message: 'HEALTHY',
      timestamp: new Date().toISOString(),
    }
  }
}
