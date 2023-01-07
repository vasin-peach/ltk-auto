import {
  BadRequestException,
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common'
import initSwagger from './config/swagger'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { TypeOrmExceptionFilter } from './filters/typeorm-exception.filter'
import { ConfigService } from '@nestjs/config'
import { ResponseInterceptor } from './interceptors/response.interceptor'
import session from 'express-session'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const config = app.get<ConfigService>(ConfigService)

  // general using
  app.use(cookieParser())
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  })
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory: (errors) => {
        return new BadRequestException({
          error: Object.values(
            errors.map((err) => {
              return Object.values(err.constraints)[0]
            }),
          ),
        })
      },
    }),
  )
  app.useGlobalFilters(
    new TypeOrmExceptionFilter(config),
    new HttpExceptionFilter(config),
  )
  app.useGlobalInterceptors(new ResponseInterceptor())
  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: process.env.NODE_ENV === 'production' ? true : false },
    }),
  )

  // production using
  if (process.env.NODE_ENV === 'production') {
    // app.use(csurf());
    app.use(helmet())
    app.enableCors({ origin: process.env.CORS_ORIGIN })
  } else {
    app.enableCors({ origin: 'http://localhost:3000' })
  }

  initSwagger(app)

  await app.listen(4000)
}
bootstrap()
