
import { SpResponse } from 'src/spresponse/spresponse.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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
  address: string;

  @Column({default: ''})
  phone: string;

  @Column({default: 'ServiceProvider'})
  role : string

  @OneToMany( () => SpResponse, spResponse => spResponse.serviceProvider, { eager: true }) 
spResponse : SpResponse[]

}
