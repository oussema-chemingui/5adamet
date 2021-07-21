import { Repository, EntityRepository, Brackets } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServicesFilterDto } from './dto/get-services.dto';
import { ServicePreviewDto } from './dto/service-preview.dto';
import { User } from '../users/user.entity';
import { NotFoundException } from '@nestjs/common';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceCategory } from '../service-categories/service-category.entity';
import { ServiceExpand } from './service-expand';

@EntityRepository(Service)
export class ServiceRepository extends Repository<Service> {
  getServices(filterDto: GetServicesFilterDto): Promise<ServicePreviewDto[]> {
    const { offset, limit, search, creatorId, categoryId, expand } = filterDto;
    const query = this.createQueryBuilder('service');
    query.select(['service.id', 'service.title', 'service.photo']);
    if (search) {
      query.where(
        new Brackets(sqb => {
          sqb.where('LOWER(service.title) LIKE :search', {
            search: `%${search.toLowerCase()}%`,
          });
          sqb.orWhere('LOWER(service.description) LIKE :search', {
            search: `%${search.toLowerCase()}%`,
          });
        }),
      );
    }
    if (categoryId) {
      query.andWhere('service.category = :categoryId', { categoryId });
    }
    if (creatorId) {
      query.leftJoin('service.creator', 'user');
      query.andWhere('user.id = :creatorId', { creatorId });
    }
    if (expand && expand.includes(ServiceExpand.CATEGORY)) {
      query.leftJoinAndSelect('service.category', 'categories');
    }
    if (expand && expand.includes(ServiceExpand.CREATOR)) {
      query.addSelect(['user_creator.id', 'user_creator.name', 'user_creator.profilePhoto']);
      query.leftJoin('service.creator', 'user_creator');
    }
    if (expand && expand.includes(ServiceExpand.LIKES)) {
      query.addSelect(['user_like.id', 'user_like.username']);
      query.leftJoin('service.likesBy', 'user_like');
    }
    query.orderBy('service.id', 'DESC');
    query.offset(offset);
    query.limit(limit);
    const headerServices: Promise<ServicePreviewDto[]> = query.getMany();
    return headerServices;
  }

  async createService(
    createServiceDto: CreateServiceDto,
    user: User,
    photoUrl: string,
    serviceCategory: ServiceCategory,
  ): Promise<{ id: number }> {
    const { title, description, externalUrl } = createServiceDto;
    const service = new Service();
    service.title = title;
    service.description = description;
    service.externalUrl = externalUrl;
    service.photo = photoUrl;
    service.creator = user;
    if (serviceCategory) {
      service.category = serviceCategory;
    }
    await service.save();
    return { id: service.id };
  }

  async getServiceById(id: number): Promise<Service> {
    const query = this.createQueryBuilder('service');
    query.addSelect(['user.id', 'user.name', 'user.profilePhoto']);
    query.leftJoin('service.creator', 'user');
    query.leftJoinAndSelect('service.category', 'serviceCategory');
    query.addSelect(['user_like.id', 'user_like.username']);
    query.leftJoin('service.likesBy', 'user_like');
    query.where('service.id = :id', { id });
    const service = await query.getOne();
    if (!service) {
      throw new NotFoundException(`Healthy Dev no encontró nada con el id ${id}`);
    }
    return service;
  }

  async updateService(
    updateServiceDto: UpdateServiceDto,
    id: number,
    user: User,
    serviceCategory: ServiceCategory,
  ): Promise<Service> {
    const { title, description, photo, externalUrl } = updateServiceDto;
    const query = this.createQueryBuilder('service');
    query.addSelect(['user.id', 'user.name', 'user.profilePhoto']);
    query.leftJoin('service.creator', 'user');
    query.leftJoinAndSelect('service.category', 'serviceCategory');
    query.where('service.id = :id', { id });
    query.andWhere('service.creator = :creatorId', { creatorId: user.id });
    const service = await query.getOne();
    if (!service) {
      throw new NotFoundException(`Healthy Dev no pudo modificar la service con el id ${id}`);
    }
    if (Object.keys(serviceCategory).length !== 0) {
      service.category = serviceCategory;
    }
    if (title !== undefined) {
      service.title = title;
    }
    if (description !== undefined) {
      service.description = description;
    }
    if (photo !== undefined) {
      service.photo = photo;
    }
    if (externalUrl !== undefined) {
      service.externalUrl = externalUrl;
    }
    try {
      await service.save();
    } catch (error) {
      throw new NotFoundException(`Healthy Dev no pudo modificar la service con el id ${id}`);
    }
    return service;
  }

  async deleteService(id: number, user: User): Promise<{ message: string }> {
    const deleteService = await this.delete({ id, creator: user });
    if (deleteService.affected === 0) {
      throw new NotFoundException(`Healthy Dev no pudo eliminar la service con el id ${id}`);
    }
    return {
      message: `La Service con el id: ${id} fue eliminada con éxito.`,
    };
  }

  async addLike(user: User, id: number): Promise<{ message: string }> {
    try {
      const service = await this.findOne(id);
      service.likesBy.push(user);
      await service.save();
    } catch (e) {
      throw new NotFoundException(`Hubo un error, el error es ${e}`);
    }
    return {
      message: '¡Me gusta!',
    };
  }

  async deleteLike(user: User, id: number): Promise<{ message: string }> {
    try {
      const service = await this.findOne(id);
      service.likesBy = service.likesBy.filter(like => like.id !== user.id);
      await service.save();
    } catch (e) {
      throw new NotFoundException(`Hubo un error, el error es ${e}`);
    }
    return {
      message: '¡No me gusta más!',
    };
  }
}
