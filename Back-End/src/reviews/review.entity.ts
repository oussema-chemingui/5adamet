import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  OneToOne,
  JoinColumn,
} from 'typeorm';



@Entity('reviews')
export class Review extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  rating: number;

  @Column()
  date: string;

  @Column()
  sp_name: string;

  @Column()
  feedback: string;

  @Column({
    nullable: true,
  })
  city: string;

  @Column()
  contact: string;

}
