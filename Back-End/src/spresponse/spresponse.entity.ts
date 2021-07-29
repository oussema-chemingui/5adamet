
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { ServiceProvider } from 'src/serviceProvider/serviceProvider.entity';


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

  @ManyToOne(() => CostEstimation, (costEstimation) => costEstimation.spResponse, { eager: false })
  costEstimation : CostEstimation;

  @ManyToOne(() => ServiceProvider, (serviceProvider) => serviceProvider.spResponse, { eager: false })
  serviceProvider : ServiceProvider;

  @Column()
  costEstimationId: number;
}
