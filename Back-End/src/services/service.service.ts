import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServiceRepository } from './service.repository';
import { GetServicesFilterDto } from './dto/get-services.dto';
import { ServicePreviewDto } from './dto/service-preview.dto';
import { CreateServiceDto } from './dto/create-service.dto';
import { User } from '../users/user.entity';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ImageManagementService } from '../image-management/image-management.service';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';
import { ServiceCategory } from '../service-categories/service-category.entity';

@Injectable()
export class ServicesService {
  private logger = new Logger('ServicesService');
  constructor(
    @InjectRepository(Service) private serviceRepository: ServiceRepository,
    private imageManagementService: ImageManagementService,
    private serviceCategoriesService: ServiceCategoriesService,
  ) {}

  async getServices(filterDto: GetServicesFilterDto): Promise<ServicePreviewDto[]> {
    return this.serviceRepository.getServices(filterDto);
  }

  async getServiceById(id: number): Promise<Service> {
    return this.serviceRepository.getServiceById(id);
  }

  async createService(createServicesDto: CreateServiceDto, user: User): Promise<{ id: number }> {
    const { photo, categoryId } = createServicesDto;
    const serviceCategory = await this.serviceCategoriesService.getServiceCategoryById(categoryId);
    if (!serviceCategory) {
      throw new NotFoundException(`Healthy Dev no encontró una categoría con el id ${categoryId}`);
    }
    let photoUrl = this.imageManagementService.placeholderServiceUrl;
    if (photo) {
      try {
        photoUrl = await this.imageManagementService.uploadImage(photo);
      } catch (error) {
        throw new InternalServerErrorException(
          'Healthy Dev no pudo guardar la imagen y cancelo creación.',
        );
      }
    }
    return this.serviceRepository.createService(createServicesDto, user, photoUrl, serviceCategory);
  }

  async updateService(updateServiceDto: UpdateServiceDto, user: User, id: number): Promise<Service> {
    const { categoryId } = updateServiceDto;
    let serviceCategory = {} as ServiceCategory;
    if (categoryId) {
      serviceCategory = await this.serviceCategoriesService.getServiceCategoryById(categoryId);
      if (!serviceCategory) {
        throw new NotFoundException(
          `Healthy Dev no encontró una categoría con el id ${categoryId}`,
        );
      }
    }
    const service = await this.serviceRepository.findOne({ id, creator: user });
    if (!service) {
      throw new NotFoundException(`Healthy Dev no pudo modificar la service con el id ${id}`);
    }
    if (updateServiceDto.photo) {
      try {
        updateServiceDto.photo = await this.imageManagementService.uploadImage(updateServiceDto.photo);
      } catch (error) {
        throw new InternalServerErrorException(
          'Healthy Dev no pudo guardar nueva imagen y cancelo cambios',
        );
      }
      if (service.photo) {
        try {
          await this.imageManagementService.deleteImage(service.photo);
        } catch (error) {
          this.logger.error(`Failed to delete image "${service.photo}"`);
        }
      }
    }
    return this.serviceRepository.updateService(updateServiceDto, id, user, serviceCategory);
  }

  async deleteService(user: User, id: number): Promise<{ message: string }> {
    const service = await this.serviceRepository.findOne({ id, creator: user });
    if (!service) {
      throw new NotFoundException(`Healthy Dev no pudo eliminar la service con el id ${id}`);
    }
    if (service.photo) {
      try {
        await this.imageManagementService.deleteImage(service.photo);
      } catch (error) {
        throw new InternalServerErrorException(
          'Healthy Dev no pudo eliminar imagen de service y cancelo eliminación',
        );
      }
    }
    return this.serviceRepository.deleteService(id, user);
  }

  async addLike(user: User, id: number): Promise<{ message: string }> {
    return this.serviceRepository.addLike(user, id);
  }

  async deleteLike(user: User, id: number): Promise<{ message: string }> {
    return this.serviceRepository.deleteLike(user, id);
  }
}
