import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RoleGuard } from '../auth/guards/role.guard'
import { StorageService } from '../storage/storage.service'
import { BrandsController } from './brands.controller'
import { BrandsService } from './brands.service'
import { Brand } from './entities/brand'

@Module({
  imports: [TypeOrmModule.forFeature([Brand])],
  controllers: [BrandsController],
  providers: [
    BrandsService,
    StorageService,
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class BrandsModule {}
