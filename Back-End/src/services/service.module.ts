import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from './service.repository';
import { AuthModule } from '../auth/auth.module';
import { ImageManagementModule } from '../image-management/image-management.module';
import { ServiceCategoriesModule } from '../service-categories/service-categories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRepository]),
    AuthModule,
    ImageManagementModule,
    ServiceCategoriesModule,
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
