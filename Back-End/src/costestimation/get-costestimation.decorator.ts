import { createParamDecorator } from '@nestjs/common';
import { CostEstimation } from './costestimation.entity';

export const GetCostEstimation = createParamDecorator(
  (req): CostEstimation => { 
    return req.user;
  },
);
