import {
    ConflictException,
    InternalServerErrorException,
  } from '@nestjs/common';
  import { EntityRepository, Repository } from 'typeorm';
  import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
  import { ServiceProvider } from './serviceProvider.entity';
  import * as bcrypt from 'bcrypt';
  
  @EntityRepository(ServiceProvider)
  export class ServiceProviderRepository extends Repository<ServiceProvider> {
    async createServiceProvider(authCredentialsDto: AuthCredentialsDto): Promise<void> {
      const { email, password } = authCredentialsDto;
  
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
  
      const sp = this.create({ email, password: hashedPassword });
  
      try {
        await this.save(sp);
      } catch (error) {
        if (error.code === '23505') {
          // duplicate username
          throw new ConflictException('Service Provider already exists');
        } else {
          throw new InternalServerErrorException();
        }
      }
    }
  }
  