import { EntityRepository, Repository } from 'typeorm';
import { Service } from './service.entity';
import { GetServicesFilterDto } from './dto/get-services-filter.dto';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  async getServices(
  ): Promise<Service[]> {
    try {
      return await this.find();
    } catch (error) {
      console.error(error);
    }
  }
}
