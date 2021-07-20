import { Injectable, NotFoundException } from '@nestjs/common';
import { ServiceCategory } from './service-category.entity';
import { ServiceCategoryRepository } from './service-category.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ServiceCategoriesService {
  constructor(
    @InjectRepository(ServiceCategory) private serviceCategoryRepository: ServiceCategoryRepository,
  ) {}

  async getServicesCategories(): Promise<ServiceCategory[]> {
    return this.serviceCategoryRepository.getServicesCategories();
  }

  async getServiceCategoryById(id: number): Promise<ServiceCategory> {
    const serviceCategory = await this.serviceCategoryRepository.findOne(id);
    if (!serviceCategory) {
      throw new NotFoundException(`no category with id ${id}`);
    }
    return serviceCategory;
  }
}
