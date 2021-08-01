import { EntityRepository, Repository } from 'typeorm';
import { Service } from './service.entity';
import { GetServicesFilterDto } from './dto/get-services-filter.dto';
import { CreateServiceDto } from './dto/create-service.dto';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {

  
  async getServices(filterDto: GetServicesFilterDto): Promise<Service[]>{
    const { search } = filterDto;
    const query = this.createQueryBuilder('service');
  
    if (search) {
      query.where(
        '(LOWER(service.name) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }
    try {
      const services = await query.getMany();
      return services;
    } catch (error) {
      console.error(error);
    }
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const { name, description, cost, main_service ,image } = createServiceDto;

    const service = this.create({
      name,
      description,
      cost,
      main_service,
      image,
    });

    await this.save(service);
    return service;
  }
}
