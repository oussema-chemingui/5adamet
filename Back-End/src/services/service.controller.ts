import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { ServicesService } from './service.service';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { GetServicesFilterDto } from './dto/get-service.dto';
import { ServicePreviewDto } from './dto/service-preview.dto';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceCategory } from '../service-categories/service-category.entity';
import { ServiceCategoriesService } from '../service-categories/service-categories.service';

@Controller()
export class ServicesController {
  constructor(
    private servicesService: ServicesService,
    private serviceCategoriesService: ServiceCategoriesService,
  ) {}

  @Get('v1/services')
  @UsePipes()
  getServices(@Query() filterDto: GetServicesFilterDto): Promise<ServicePreviewDto[]> {
    return this.servicesService.getServices(filterDto);
  }

  @Get('v1/services/categories')
  getServicesCategories(): Promise<ServiceCategory[]> {
    return this.serviceCategoriesService.getServicesCategories();
  }

  @Get('v1/services/:id')
  getServiceById(@Param('id', ParseIntPipe) id: number): Promise<Service> {
    return this.servicesService.getServiceById(id);
  }

  @Post('v1/services')
  @UsePipes()
  @UseGuards(AuthGuard())
  createService(
    @Body() createServicesDto: CreateServiceDto,
    @GetUser() user: User,
  ): Promise<{ id: number }> {
    return this.servicesService.createService(createServicesDto, user);
  }

  @Put('v1/services/:id')
  @UsePipes()
  @UseGuards(AuthGuard())
  updateService(
    @Body() updateServiceDto: UpdateServiceDto,
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Service> {
    if (Object.keys(updateServiceDto).length === 0) {
      throw new BadRequestException(
        'Debe modificar al menos alguno de los campos, titulo, descripcion, imagen, link o categoría.',
      );
    }
    return this.servicesService.updateService(updateServiceDto, user, id);
  }

  @Delete('v1/services/:id')
  @UsePipes()
  @UseGuards(AuthGuard())
  deleteService(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.servicesService.deleteService(user, id);
  }

  @Post('v1/services/:id/like')
  @UseGuards(AuthGuard())
  addLike(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.servicesService.addLike(user, id);
  }

  @Delete('v1/services/:id/like')
  @UseGuards(AuthGuard())
  deleteLike(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string }> {
    return this.servicesService.deleteLike(user, id);
  }
}
