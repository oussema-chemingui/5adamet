import { EntityRepository, Repository } from 'typeorm';
import { Service } from './service.entity';
import { GetServicesFilterDto } from './dto/get-services-filter.dto';
import { CreateServiceDto } from './dto/create-service.dto';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {

  
  async getServices(filterDto: GetServicesFilterDto): Promise<Service[]>{


    try {
      return await this.find();
    } catch (error) {
      console.error(error);
    }
  }

  async createService(createServiceDto: CreateServiceDto): Promise<Service> {
    const { name, description, coast, main_service } = createServiceDto;

    const service = this.create({
      name,
      description,
      coast,
      main_service,
    });

    await this.save(service);
    return service;
  }
}
