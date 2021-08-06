
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CostAnswerStatus } from './costanswer.enum';





@Entity('costanswers')
export class CostAnswer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  date: string;


  @Column()
  username: string;

  
  @Column({
    default: 0.0,
  })
  total: number;


  @Column()
  spname: string;

  
  @Column()
  status: CostAnswerStatus; 


}
