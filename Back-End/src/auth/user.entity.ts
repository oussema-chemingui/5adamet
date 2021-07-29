
import { CostEstimation } from 'src/costestimation/costestimation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column({default: ''})
  adress: string;

  @Column({default: ''})
  phone: string;

  @Column({default: 'user'})
  role : string;

  @OneToMany( () => CostEstimation, costestimation => costestimation.user, { eager: true }) 
costEstimations : CostEstimation[]
}
