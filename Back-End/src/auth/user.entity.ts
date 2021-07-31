
import { Cart } from 'src/cart/cart.entity';
import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({default: ''})
  adress: string;

  @Column({default: ''})
  phone: string;

  @Column({default:'user'})
  role : string

  
  // @OneToOne(type => Cart, cart => cart.user, {
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn()
  // cart: Cart;



  @OneToMany( () => CostEstimation, costestimation => costestimation.user) //, { eager: true }
costEstimations : CostEstimation[]
}
