import { Injectable, NotFoundException, Req, Res } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Service } from '../service/service.entity';
import { ServiceService } from '../service/service.service';
import { DeleteResult } from 'typeorm';
import { UpdateCategoryDto } from './dto/update-category.dto';
import * as fs from 'fs';


@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
    private readonly serviceService: ServiceService,

  ) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }


  async getCategory(id: number): Promise<Category> {
    const category: Category = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException(`Category with id: ${id}  not found `);
    }
    return category;
  }


  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }


  async createService(
    id: number,
    name: string,
    description: string,
    coast: number,
    image: any,
  ) {
    const category: Category = await this.getCategory(id);
    const service = new Service();
    service.name = name;
    service.description = description;
    service.coast = coast;
    service.category = category;
    service.image = image ; //await this. .fileupload(image);
    console.log(service.image);
    category.services.push(await service.save());
  }

  async updateService(
    categoryId: number,
    serviceId: number,
    name: string,
    description: string,
    coast: number,
    image: any,
  ): Promise<void> {
    const category: Category = await this.getCategory(categoryId);
    const service = category.services.find(serv => serv.id === serviceId);
    if (name) {
      service.name = name;
    }
    if (description) {
      service.description = description;
    }
    if (coast) {
      service.coast = coast;
    }

    if (image) {
      // await this. .fileDelete(service.image);
      // service.image = await this. .fileupload(image);
    }
    await service.save();
  }
  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    const category = await this.getCategory(id);
    const { name, description } = updateCategoryDto;
    if (name) {
      category.name = name;
    }
    if (description) {
      category.description = description;
    }
    await category.save();
  }

  async getServices(categoryId: number) {
    const category = await this.getCategory(categoryId);
    const services = category.services;
    services.forEach(serv => {
      if (serv.id === 81) {
        console.log(serv.image.substring(55));
      }
    });
    return services;
  }

  async deleteCategory(categoryId: number): Promise<DeleteResult> {
    const result = await this.categoryRepository.delete(categoryId);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Category with id: ${categoryId} is not found `,
      );
    }
    return result;
  }

  async deleteService(categoryId: number, serviceId: number) {
    const category: Category = await this.getCategory(categoryId);
    const service = category.services.find(serv => serv.id === serviceId);
    if (service.image) {
      // await this. .fileDelete(service.image);
    }
    await this.serviceService.deleteService(serviceId);
  }
}
