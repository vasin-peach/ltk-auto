import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get<number>('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          autoLoadEntities: true,
          synchronize: process.env.NODE_ENV === 'production' ? false : true,
          retryAttempts: 2,
          retryDelay: 10000,
          connectTimeoutMS: 10000,
          maxQueryExecutionTime: 5000,
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
