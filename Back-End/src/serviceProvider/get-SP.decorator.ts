import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ServiceProvider } from './serviceProvider.entity';

export const GetSP = createParamDecorator(
  (_data, context: ExecutionContext): ServiceProvider => {
    const req = context.switchToHttp().getRequest();
    return req.ServiceProvider;
  },
);
