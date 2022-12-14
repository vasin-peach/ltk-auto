import { CacheInterceptor, CacheModule, Module } from '@nestjs/common'
import { UsersModule } from './modules/users/users.module'
import { ConfigModule } from '@nestjs/config'
import { DatabaseModule } from './config/database/postgres/provider.module'
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { AuthModule } from './modules/auth/auth.module'
import { CommonModule } from './common/common.module'
import { RoleGuard } from './modules/auth/guards/role.guard'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.local'],
      isGlobal: true,
    }),
    CacheModule.register(),
    DatabaseModule,
    CommonModule,
    UsersModule,
    AuthModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class AppModule {}
