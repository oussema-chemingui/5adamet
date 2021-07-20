
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  adress: string;

  @Column()
  phone: string;


}
