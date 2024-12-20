import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  numeroTelephone: string;


  constructor(id: number, username: string, password: string, nom: string, prenom: string, mail: string, tel: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.nom = nom;
    this.prenom = prenom;
    this.email = mail;
    this.numeroTelephone = tel;
  }
}
