import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Localisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float' })
  longitude: number;

  @Column({ type: 'float' })
  latitude: number;

  @ManyToOne(() => User, (user) => user.localisations, { onDelete: 'CASCADE' })
  user: User;
}
