import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { UserModule } from './modules/users/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { RecipeModule } from './modules/recipe/recipe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
    }),
    CacheModule.register(),
    DatabaseModule,
    UserModule,
    RecipeModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
