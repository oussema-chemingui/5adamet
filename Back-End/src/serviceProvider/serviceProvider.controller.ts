import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Post,
  Patch,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Body,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';

import { ServiceProviderService } from './serviceProvider.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ServiceProvider } from './serviceProvider.entity';


@Controller('serviceproviders')
export class ServiceProviderController {
  constructor(private readonly serviceProviderService: ServiceProviderService) {}

 
  @Get('getall')
  getServiceProviders( ): Promise<ServiceProvider[]> {
    return this.serviceProviderService.getAllItems();
  }


  @Get('getprovider/:id')
  getService(@Param('id', ParseIntPipe) serviceId) {
    return this.serviceProviderService.getProvider(serviceId);
  }


  @Delete(':id')
  deleteService(@Param('id',ParseIntPipe) id : number): Promise<any> {
    console.log(id)
    return this.serviceProviderService.deleteProvider(id);
  }


}
