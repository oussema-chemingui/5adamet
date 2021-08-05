import { SpResponse } from 'src/spresponse/spresponse.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostEstimationStatus } from './costestimation.enum';




@Entity('costestimations')
export class CostEstimation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  service: string;

  @Column()
  username: string;

  @Column()
  city: string;

  @Column()
  status: CostEstimationStatus; 

  @Column({
    nullable: true,
  })
  image: string;




}
