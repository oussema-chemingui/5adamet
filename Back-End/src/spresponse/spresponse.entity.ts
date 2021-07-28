
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CostEstimation } from 'src/costestimation/costestimation.entity';
// import { User } from '../auth/user.entity'
// import { CostEstimationStatus } from './costestimation.enum';
@Entity()
export class SpResponse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cost: number;

  @Column()
  response: string;

  @Column()
  date: Date;

  // @ManyToOne(() => CostEstimation, (costEstimation) => costEstimation.spResponses, { eager: false })
  // costEstimation : CostEstimation;

}
