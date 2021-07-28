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
} from '@nestjs/common';

import { ServiceService } from './service.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateServiceDto } from './dto/create-service.dto'
import { Service } from './service.entity';

@Controller('services')
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}
 
  @Get('getservices')
  getServices() {
    return this.serviceService.getServices();
  }

  @Get('getservices/:id')
  getService(@Param('id', ParseIntPipe) serviceId) {
    return this.serviceService.getService(serviceId);
  }


  @Post('createservices')
  @UseInterceptors(FileInterceptor('image'))
  createService( @UploadedFile() image , @Body('serviceObj') body: string ,
 
   ) :void  {
     const createServiceDto = new CreateServiceDto(JSON.parse(body))
     console.log(createServiceDto )
     console.log(image)
    // return this.serviceService.createService(createServiceDto);
  }



  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.serviceService.uploadImageToCloudinary(file)
  }

 
}
