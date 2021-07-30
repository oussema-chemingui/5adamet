import {
  PrimaryGeneratedColumn,
  OneToOne,
  Entity,
  BaseEntity,
  Column,
  OneToMany,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Service } from '../service/service.entity';

@Entity('cart_items')
export class CartItem extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_services: number;

  // @OneToMany(type => Service, service => service.cartItem, {
  //     eager: true,
  // })
  // services: Service[];

  @OneToOne(type => Cart, cart => cart.cart_item, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  cart: Cart;
}
