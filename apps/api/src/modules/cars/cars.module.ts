import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleGuard } from '../auth/guards/role.guard'
import { BrandsService } from '../brand/brands.service'
import { Brand } from '../brand/entities/brand'
import { StorageService } from '../storage/storage.service'
import { CarsController } from './cars.controller'
import { CarsService } from './cars.service'
import { Car } from './entities/car'

@Module({
  imports: [TypeOrmModule.forFeature([Car, Brand])],
  controllers: [CarsController],
  providers: [
    CarsService,
    BrandsService,
    StorageService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
  exports: [],
})
export class CarsModule {}
