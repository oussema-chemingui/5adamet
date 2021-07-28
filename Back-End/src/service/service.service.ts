import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceRepository } from './servicerepository';
import { Service } from './service.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(ServiceRepository)
    private serviceRepository: ServiceRepository,
    private cloudinary:CloudinaryService
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

  

  async getServicesByCategory(categoryName: string): Promise<Service[]> {
    const service = await this.serviceRepository.find({
      where: {  main_service: categoryName },
    });
    if (!service) {
      throw new NotFoundException(
        `Product with this category: ${categoryName} is not found `,
      );
    }
    return service;
  }




  createService(createServiceDto: CreateServiceDto,): Promise<Service> {
    return this.serviceRepository.createService(createServiceDto);
  }



  async deleteService(id: number): Promise<void> {
    const service = await this.getService(id);
    const result = await this.serviceRepository.delete(service);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id: ${id} is not found `);
    }
  }


  async uploadImageToCloudinary(file: Express.Multer.File) {
    return await this.cloudinary.uploadImage(file).catch(() => {
      throw new BadRequestException('Invalid file type.');
    });
  }
  
}
