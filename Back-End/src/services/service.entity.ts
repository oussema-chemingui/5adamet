import { ServiceCategory } from '../service-categories/service-category.entity';
import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  JoinTable,
  ManyToMany,

} from 'typeorm';



@Entity()
export class Service extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  externalUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    type => ServiceCategory,
    category => category.id,
  )
  category: ServiceCategory;

  }
