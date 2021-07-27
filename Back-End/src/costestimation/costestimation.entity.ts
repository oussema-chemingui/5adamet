
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../auth/user.entity'
import { CostEstimationStatus } from './costestimation.enum';
@Entity()
export class CostEstimation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  date: Date;

  @Column()
  status: CostEstimationStatus;

  @ManyToOne((_type) => User, (user) => user.costEstimations, { eager: false })
  user: User;

}
