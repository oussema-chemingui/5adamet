import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, Index, OneToMany } from 'typeorm';
import { Service } from '../services/service.entity';

@Index('idx_name', ['name'], {})
@Entity()
export class ServiceCategory extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    type => Service,
    service => service.category,
  )
  services: Service[];
}
