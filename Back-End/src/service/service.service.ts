import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './servicerepository';
import { Service } from './service.entity';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceRepository)
    private serviceRepository: ServiceRepository,
  ) {}

  async getServices(): Promise<Service[]> {
    return await this.serviceRepository.getServices();
  }

  async getService(serviceId: number): Promise<Service> {
    const service = await this.serviceRepository.findOne({
      where: { id: serviceId },
    });
    if (!service) {
      throw new NotFoundException(
        `Product with id: ${serviceId} is not found `,
      );
    }
    return service;
  }

  async deleteService(id: number): Promise<void> {
    const service = await this.getService(id);
    const result = await this.serviceRepository.delete(service);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id: ${id} is not found `);
    }
  }
}
