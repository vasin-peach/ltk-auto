import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { createMessageName } from './helper';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private configService: ConfigService) {}
  private logger = new Logger('Exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const method = request.method.toUpperCase();
    const url = request.url;
    const ip = request.ip;

    // extract exception content
    const exceptionResponse = exception.getResponse() as Record<string, any>;

    response.status(status).json({
      statusCode: status,
      error: exceptionResponse.error || null,
      errorCode: `${status}`,
      message: createMessageName(host, status),
      data: null,
      timestamp: new Date().toISOString(),
      debug:
        this.configService.get('NODE_ENV') === 'development'
          ? exception
          : undefined,
    });

    this.logger.log(
      `HTTPException {${decodeURIComponent(url)}, ${method}} (${ip}) ${
        Array.isArray(exceptionResponse.error)
          ? exceptionResponse?.error?.join(', ')
          : exceptionResponse?.error
      }`,
    );
  }
}
