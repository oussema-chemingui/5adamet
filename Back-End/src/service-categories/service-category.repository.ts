import { Repository, EntityRepository } from 'typeorm';
import { ServiceCategory } from './service-category.entity';

@EntityRepository(ServiceCategory)
export class ServiceCategoryRepository extends Repository<ServiceCategory> {
  getServicesCategories(): Promise<ServiceCategory[]> {
    const query = this.createQueryBuilder('category');
    query.orderBy('category.name', 'ASC');
    return query.getMany();
  }
}
