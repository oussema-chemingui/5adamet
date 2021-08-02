import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { User } from '../auth/user.entity';

@Entity('cart')
export class Cart extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

  @Column()
  service_name: string;

  @Column()
  main_service: string;

  @Column()
  username: string;
  
  @Column({ default: 1 } )
  quantity: number;

  @Column({
    nullable: true,
  })
  image: string;


}
