import { User } from "src/auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";

import { Cart } from "./cart.entity";


@EntityRepository(Cart)
export class CartRepository extends Repository<Cart> {

    async getAllItems(): Promise<Cart[]>{


        const query = this.createQueryBuilder('cart')

        try {
            const cartItems = await query.getMany()
            return cartItems;
          } catch (error) {
            console.error(error);
          }
       
    }



    async createCartItem(
        createCartItemDto : CreateCartItemDto,
        ) : Promise<Cart> {
        const {  cost ,service_name,main_service  , quantity , username,image} = createCartItemDto;
        
        const cart = this.create({
          username,
          service_name,
          quantity,
          cost,
          main_service,
         image,
        });
        
      await this.save(cart);
    return cart;

    }






}