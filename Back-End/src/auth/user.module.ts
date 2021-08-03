import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController} from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';

import { PassportModule } from '@nestjs/passport';

import { UsersRepository } from './users.repository';



@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository ]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),

  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
