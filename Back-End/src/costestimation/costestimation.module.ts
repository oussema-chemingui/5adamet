import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CostestimationController } from './costestimation.controller';
import { CostEstimationRepository } from './costestimation.repository';
import { CostestimationService } from './costestimation.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CostEstimationRepository])
  ],
  controllers: [CostestimationController],
  providers: [CostestimationService]
})
export class CostestimationModule {}
