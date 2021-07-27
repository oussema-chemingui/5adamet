import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CostEstimation } from './costestimation.entity';
import { CostestimationService } from './costestimation.service';

@Controller('costestimation')
export class CostestimationController {
    constructor(private costEstimationService:CostestimationService){}

    @Get('/costEstimation/:id')
    getCostEstimationById(@Param('id',ParseIntPipe) id: number): Promise<CostEstimation> {
      return this.costEstimationService.getCostEstimationById(id);
    }
}
