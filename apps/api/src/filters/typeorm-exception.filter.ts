import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common'
import { TypeORMError } from 'typeorm'
import { Request, Response } from 'express'
import { ConfigService } from '@nestjs/config'
import { createMessageName } from './helper'

Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}
  private logger = new Logger('Exception')

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<Request>()
    const response = ctx.getResponse<Response>()

    const method = request.method.toUpperCase()
    const url = request.url
    const ip = request.ip
    const excludePaths = ['redirect']

    if (excludePaths.find((path) => url.includes(path)))
      return response.redirect(`${process.env.CLIENT_URL}/signin`)

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception?.message,
      errorCode: exception?.code,
      message: createMessageName(
        host,
        HttpStatus.INTERNAL_SERVER_ERROR,
        exception.name,
      ),
      timestamp: new Date().toISOString(),
      data: null,
      debug:
        this.configService.get('NODE_ENV') === 'development'
          ? exception
          : undefined,
    })

    this.logger.log(
      `TypeORMException {${decodeURIComponent(url)}, ${method}} (${ip}) ${
        exception.message
      }`,
    )
  }
}
