import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  BaseEntity,
  Unique,
} from 'typeorm';
import { Service } from '../service/service.entity';
import { CategoryTypes } from './category-types.enum';

@Entity('categories')
@Unique(['type'])
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  // @OneToMany(type => Service, service => service.category, {
  //   eager: true,
  //   onDelete: 'CASCADE',
  //   onUpdate: 'CASCADE'
  // })
  // services: Service[];

  @Column()
  type: CategoryTypes;
}
