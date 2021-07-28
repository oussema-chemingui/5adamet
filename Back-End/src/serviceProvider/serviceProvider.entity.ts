
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ServiceProvider {
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

  @Column({default: 'ServiceProvider'})
  role : string

}
