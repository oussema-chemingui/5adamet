import { BadRequestException, Injectable } from '@nestjs/common';
import { ServiceProviderRepository } from './serviceProvider.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ServiceProvider } from './serviceProvider.entity';



@Injectable()
export class ServiceProviderService {
    

constructor(
    @InjectRepository(ServiceProviderRepository)
    private serviceProviderRepository: ServiceProviderRepository,
  
)
{}

async getAllItems():Promise<ServiceProvider[]>{
 return this.serviceProviderRepository.getAllItems()
}



  
}
