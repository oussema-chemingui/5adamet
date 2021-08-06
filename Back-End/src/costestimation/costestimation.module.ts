import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { CostestimationController } from './costestimation.controller';
import { CostEstimationRepository } from './costestimation.repository';
import { CostestimationService } from './costestimation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostEstimationRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    CloudinaryModule,
  ],
  controllers: [CostestimationController],
  providers: [CostestimationService],
  exports: [CostestimationService],
})
export class CostestimationModule {}
