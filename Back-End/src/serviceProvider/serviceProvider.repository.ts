import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
 
  import { ServiceProvider } from './serviceProvider.entity';
  import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/auth/dto/auth-credentials-signup.dto';
  
  @EntityRepository(ServiceProvider)
  export class ServiceProviderRepository extends Repository<ServiceProvider> {
   
    async getAllItems(): Promise<ServiceProvider[]>{


      const query = this.createQueryBuilder('serviceProvider')

      try {
          const ServiceProviders = await query.getMany()
          return ServiceProviders;
        } catch (error) {
          console.error(error);
        }
     
  }
    
    
    
    
    
    async createServiceProvider(authCredentialsDto: SignUpDto): Promise<void> {
      const { email, password ,name ,address,phone} = authCredentialsDto;
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const sp = this.create({ name ,email, password: hashedPassword,address,phone});
  
      try {
        await this.save(sp);
      } catch (error) {
        if (error.code === '23505') {
          // duplicate username

          throw new ConflictException('Service Provider already exists');
        } else {
          console.log(error)
          throw new InternalServerErrorException();
        }
      }
    }
    
    // async updateQuotes(n:number,serviceProvider:ServiceProvider):Promise<any>{

    // }
    

  }
  