import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CostEstimation } from './costestimation.entity';

export const GetCostEstimation = createParamDecorator(
  (_data, context: ExecutionContext): CostEstimation => { 
   
    const req = context.switchToHttp().getRequest()
    console.log(req.params)
    
    return req.user
  },
);
