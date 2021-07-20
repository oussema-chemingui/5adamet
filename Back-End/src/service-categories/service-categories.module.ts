import { Module } from '@nestjs/common';
import { ServiceCategoriesController } from './service-categories.controller';
import { ServiceCategoriesService } from './service-categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceCategoryRepository } from './service-category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceCategoryRepository])],
  controllers: [ServiceCategoriesController],
  providers: [ServiceCategoriesService],
  exports: [ServiceCategoriesService],
})
export class ServiceCategoriesModule {}
