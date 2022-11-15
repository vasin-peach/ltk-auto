import { ApiMethodEnum } from '@libs/constant';
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger('Exception');

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const name = request.path.split('/')[1].toUpperCase();
    const method = request.method.toUpperCase();
    const url = request.url;
    const ip = request.ip;

    // extract exception content
    const exceptionResponse = exception.getResponse() as Record<string, any>;

    // generate message
    const generateMessage = (message: string, status: number) => {
      const httpMessage = Object.entries(HttpStatus).find(
        ([, val]) => val === status,
      );

      if (!httpMessage) return `${ApiMethodEnum[method]}_${name}_ERROR`;
      return `${ApiMethodEnum[method]}_${name}_${httpMessage[0]}`;
    };

    response.status(status).json({
      statusCode: status,
      error: exceptionResponse.error || null,
      errorCode: `${status}`,
      message: generateMessage(exceptionResponse.message, status),
      timestamp: new Date().toISOString(),
    });

    this.logger.log(
      `HTTPException {${decodeURIComponent(
        url,
      )}, ${method}} (${ip}) ${exceptionResponse.error.join(', ')}`,
    );
  }
}
