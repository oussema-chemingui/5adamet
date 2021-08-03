import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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



async getProvider(providerId: number): Promise<ServiceProvider> {
    const provider = await this.serviceProviderRepository.findOne({
      where: { id: providerId },
    });
    if (!provider) {
      throw new NotFoundException(
        `Product with id: ${providerId} is not found `,
      );
    }
    return provider;
  }


async deleteProvider(id: number): Promise<void> {
  try{
    const result = await this.serviceProviderRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Cart Item with ID "${id}" not found`);
    }
  }catch(err){
    console.log(err)
    }
  
 }

}
