import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CostestimationController } from './costestimation.controller';
import { CostEstimationRepository } from './costestimation.repository';
import { CostestimationService } from './costestimation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostEstimationRepository]),
    AuthModule
  ],
  controllers: [CostestimationController],
  providers: [CostestimationService]
})
export class CostestimationModule {}
