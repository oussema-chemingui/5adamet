import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceRepository } from './servicerepository';
import { PassportModule } from '@nestjs/passport';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([ServiceRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    CloudinaryModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
  ],
  controllers: [ServiceController],
  providers: [ServiceService],
  exports: [ServiceService],
})
export class ServiceModule {}
