
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';
import { SpResponseStatus } from './spresponse.enum';


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

  @Column()
  costEstimationId: number;

  @Column()
  status: SpResponseStatus;


 
}
