import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleGuard } from '../auth/guards/role.guard'
import { Car } from './entities/car'

@Module({
  imports: [TypeOrmModule.forFeature([Car])],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [],
})
export class CarsModule {}
