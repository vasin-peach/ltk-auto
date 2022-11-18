import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseOneDto, ResponseManyDto } from '../common/dto/response.dto';
import { createMessageName } from '../filters/helper';

@Injectable()
export class ResponseInterceptor<T>
  implements NestInterceptor<T, ResponseOneDto<T> | ResponseManyDto<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseOneDto<T> | ResponseManyDto<T>> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = data?.data ? HttpStatus.OK : HttpStatus.NOT_FOUND;
        return {
          statusCode: statusCode,
          error: null,
          errorCode: null,
          message: createMessageName(context, statusCode),
          data: data?.data,
          meta: data?.meta,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
