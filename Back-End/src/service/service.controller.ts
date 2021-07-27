import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';

import { ServiceService } from './service.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
 
  @Get()
  getServices(
  ) {
    return this.serviceService.getServices();
  }

  @Get(':id')
  getService(@Param('id', ParseIntPipe) serviceId) {
    return this.serviceService.getService(serviceId);
  }

 
}
