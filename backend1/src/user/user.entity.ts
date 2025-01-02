import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Localisation } from '../localisation/localisation.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  numeroTelephone: string;

  @OneToMany(() => Localisation, (localisation) => localisation.user)
  localisations: Localisation[];
}
