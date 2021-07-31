import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController, CartItemController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Cart } from './cart.entity';

import { CartItem } from './cart-item.entity';
import { PassportModule } from '@nestjs/passport';



@Module({
  imports: [
    TypeOrmModule.forFeature([Cart, CartItem]),
    forwardRef(() => AuthModule),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [CartService],
  controllers: [CartController, CartItemController],
  exports: [CartService],
})
export class CartModule {}
