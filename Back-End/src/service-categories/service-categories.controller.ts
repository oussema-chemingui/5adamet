import { Controller, Get } from '@nestjs/common';
import { ServiceCategoriesService } from './service-categories.service';

@Controller()
export class ServiceCategoriesController {
  constructor(private serviceCategoriesService: ServiceCategoriesService) {}
}
