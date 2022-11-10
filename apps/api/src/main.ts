import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import initSwagger from './swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // general using
  app.use(cookieParser());
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

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
