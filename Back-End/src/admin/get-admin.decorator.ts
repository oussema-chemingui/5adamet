import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Admin } from './admin.entity';

export const GetAdmin = createParamDecorator(
  (_data, context: ExecutionContext): Admin => {
    const req = context.switchToHttp().getRequest();
    return req.admin;
  },
);
