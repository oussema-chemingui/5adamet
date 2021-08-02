import { Module, forwardRef } from '@nestjs/common';
import { ServiceProviderService } from './serviceProvider.service';
import { ServiceProviderController} from './serviceProvider.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { PassportModule } from '@nestjs/passport';

import { ServiceProviderRepository } from './serviceProvider.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceProviderRepository ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
  providers: [ServiceProviderService],
  controllers: [ServiceProviderController],
  exports: [ServiceProviderService],
})
export class ServiceProviderModule {}
