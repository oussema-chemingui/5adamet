import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Cart } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../auth/user.entity';


import { CartItem } from './cart-item.entity';
import { Service } from '../service/service.entity';



@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,

  ) {}

  async getCart(id: number, user?: User): Promise<Cart> {
    let cart = null;
    if (id) {
      cart = this.cartRepository.findOne({
        id,
      });
    }
    if (user) {
      cart = this.cartRepository.findOne({
         where: { id, user } }
      );
    }

    if (!cart) {
      throw new NotFoundException(`Cart with id: ${id} not found`);
    }
    return cart;
  }

  async getCartItem(id: number, cart?: Cart): Promise<CartItem> {
    let cart_item = null;
    if (id) {
      cart_item = this.cartItemRepository.findOne({
        id,
      });
    }
    if (cart) {
      cart_item = this.cartItemRepository.findOne({
        cart,
      });
    }

    if (!cart_item) {
      throw new NotFoundException(`CartItem with id: ${id} not found`);
    }
    return cart_item;
  }

  async clearCartItemServices(cart_item_id: number): Promise<CartItem> {
    const cart_item = await this.getCartItem(cart_item_id);
    cart_item.total_services = 0;
   // cart_item.services = [];
    await cart_item.save();
    return cart_item;
  }

  async removeFromCart(cart_item_id: number, serviceId: number): Promise<CartItem> {
    const cart_item = await this.getCartItem(cart_item_id);
    if (cart_item) {
     // const array = cart_item.services;
      const array = [];
      for (let i = 0; i < array.length; i = i + 1) {
        if (array[i].id === serviceId) {
          const service = array.find(prod => {
            return prod.id === serviceId;
          });
          await service.save();
          array.splice(i, 1);
          cart_item.total_services = cart_item.total_services - 1;
          await cart_item.save();
        }
      }
      return cart_item;
    }
  }

  async deleteCart(cart: Cart): Promise<void> {
    await this.cartRepository.delete(cart);
  }

  async deleteCartItem(cart_item: CartItem): Promise<void> {
    await this.cartItemRepository.remove(cart_item);
  }

  async serviceCheckout(
    user: User,
    cartItemId: number,
    serviceId: number,

    quantity: number
  ): Promise<void> {
    // const cart_item = await this.getCartItem(cartItemId);
    // const service = cart_item.services.find(
    //   service => service.id === serviceId,
    // );
    // if (!service) {
    //   throw new NotFoundException(
    //     `Service  with id: ${serviceId}  not found in Cart`,
    //   );
    // }

  
  }

  async cartCheckout(){}
  //(
  //   user: User,
  //   cart_item_id: number,
  //   cartServicesQuantity: any
  // ): Promise<void> {
  //   const cart_item = await this.getCartItem(cart_item_id);
  //   for (let i = 0; i < cart_item.services.length; i++) {
  //     const service = cart_item.services[i];
  //     if (!service) {
  //       throw new NotFoundException(`Service is not found in this Cart`);
  //     }
  //     const serviceQuantity  = cartServicesQuantity[i];
      
  //     await service.save();
  //   }
  //   try {} catch (error) {
  //     console.error(error);
  //   }
  // }



}
