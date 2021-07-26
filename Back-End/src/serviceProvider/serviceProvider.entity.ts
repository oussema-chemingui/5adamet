
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

  @Column()
  location: string;

  @Column({default: ''})
  phone: string;

}
