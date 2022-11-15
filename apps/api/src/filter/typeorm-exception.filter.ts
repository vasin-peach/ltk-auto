import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';
import { Request, Response } from 'express';
import { ApiMethodEnum } from '@libs/constant';
import { ConfigService } from '@nestjs/config';

Catch(TypeORMError);
export class TypeOrmExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}
  private logger = new Logger('Exception');

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const name = request.path.split('/')[1].toUpperCase();
    const method = request.method.toUpperCase();
    const url = request.url;
    const ip = request.ip;

    // generate message
    const generateMessage = (error: string) => {
      const errorMessage = error
        .match(/[A-Z][a-z]+/g)
        .join('_')
        .toUpperCase();

      return `${ApiMethodEnum[method]}_${name}_${errorMessage}`;
    };

    const message = generateMessage(exception.name);
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      error: exception?.message,
      errorCode: exception?.code,
      message: message,
      timestamp: new Date().toISOString(),
      debug:
        this.configService.get('NODE_ENV') === 'development'
          ? exception
          : undefined,
    });

    this.logger.log(
      `TypeORMException {${decodeURIComponent(url)}, ${method}} (${ip}) ${
        exception.message
      }`,
    );
  }
}
