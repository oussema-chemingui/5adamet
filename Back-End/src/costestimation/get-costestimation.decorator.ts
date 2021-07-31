import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CostEstimation } from './costestimation.entity';

export const GetCostEstimation = createParamDecorator(
  (_data, req): CostEstimation => { 
  console.log(req)
    return req.costestimation
  },
);

