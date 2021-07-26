import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Category } from '../category/category.entity';


@Entity('services')
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('float',{
    default: 0.0
  })
  coast: number;


  @Column({
    nullable: true
  })
  image: string;


  @ManyToOne(type => Category, category => category.services, {
    eager: false,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  })
  category: Category;


}
