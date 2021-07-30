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
} from '@nestjs/common';

import { ServiceService } from './service.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateServiceDto } from './dto/create-service.dto';
import { Service } from './service.entity';
import { GetServicesFilterDto } from './dto/get-services-filter.dto';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get('getservices')
 
  getServices(
    @Query() filterDto: GetServicesFilterDto,
  
  ): Promise<Service[]> {
    return this.serviceService.getServices(filterDto);
  }

  @Get('getservices/:id')
  getService(@Param('id', ParseIntPipe) serviceId) {
    return this.serviceService.getService(serviceId);
  }

  @Post('createservices')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseInterceptors(FileInterceptor('image'))
  createService( @UploadedFile() image , @Body() createServiceDto: CreateServiceDto ,
 
   ) :Promise<Service>  {

     return this.serviceService.createService(createServiceDto);

  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.serviceService.uploadImageToCloudinary(file);
  }
}
