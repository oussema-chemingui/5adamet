import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';

import { ServiceService } from './service.service';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  getServices() {
    return this.serviceService.getServices();
  }

  @Get(':id')
  getService(@Param('id', ParseIntPipe) serviceId) {
    return this.serviceService.getService(serviceId);
  }
}
