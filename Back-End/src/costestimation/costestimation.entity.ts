
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CostEstimation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  description: string;

  @Column({default: ''})
  address: string;

  @Column({default: ''})
  phone: string;

  @Column()
  comment: string;

  @Column()
  providers: number;

}
