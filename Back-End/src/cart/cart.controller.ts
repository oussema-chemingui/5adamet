import {
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Body,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

import { Cart } from './cart.entity';
import { Service } from '../service/service.entity';



@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {
  }

  @UseGuards(AuthGuard())
  @Get(':id')
  getCart(@Param('id', ParseIntPipe) cartId: number) {
    return this.cartService.getCart(cartId);
  }

}

@Controller('cart_items')
export class CartItemController {
  constructor(private readonly cartService: CartService) {
  }

  @UseGuards(AuthGuard())
  @Get(':cart_item_id')
  getCartItem(@Param('cart_item_id', ParseIntPipe) cart_item_id: number) {
    return this.cartService.getCartItem(cart_item_id);
  }

  @UseGuards(AuthGuard())
  @Delete(':cart_item_id/services/clear-services')
  clearServices(@Param('cart_item_id', ParseIntPipe) cart_item_id: number) {
    return this.cartService.clearCartItemServices(cart_item_id);
  }

  @UseGuards(AuthGuard())
  @Delete(':cart_item_id/services/:id/remove-from-cart')
  removeFromCart(@Param('cart_item_id', ParseIntPipe) cart_item_id: number,
                 @Param('id', ParseIntPipe) productId: number) {
    return this.cartService.removeFromCart(cart_item_id, productId);
  }



  // @UseGuards(AuthGuard())
  // @Post(':cart_item_id/checkout')
  // cartCheckout(
  //   @GetUser() user: User,
  //   @Param('cart_item_id', ParseIntPipe) cart_item_id: number,
  //   @Body('cartServicesQuantity') cartServicesQuantity: any
  // ) {
  //   return this.cartService.cartCheckout(
  //     user,
  //     cart_item_id,
  //     cartServicesQuantity
  //   );
  // }


}
