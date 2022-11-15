import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import initSwagger from './config/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { TypeOrmExceptionFilter } from './filter/typeorm-exception.filter';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  // general using
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          error: Object.values(
            errors.map((err) => {
              return Object.values(err.constraints)[0];
            }),
          ),
        });
      },
    }),
  );
  app.useGlobalFilters(
    new TypeOrmExceptionFilter(config),
    new HttpExceptionFilter(),
  );

  // production using
  if (process.env.NODE_ENV === 'production') {
    // app.use(csurf());
    app.use(helmet());
    app.enableCors({ origin: process.env.CORS_ORIGIN });
  }

  initSwagger(app);

  await app.listen(4000);
}
bootstrap();
