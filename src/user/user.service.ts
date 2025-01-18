import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService 
{
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Ajoute un utilisateur avec hachage du mot de passe
  async addUser(username: string,password: string,nom: string,prenom: string,email: string,numeroTelephone: string,): Promise<string> 
  {
    const existingUser = await this.userRepository.findOne({ where: [{ username }] });
    if (existingUser) 
    {
      throw new Error('Username already taken');
    }
    const existingMail = await this.userRepository.findOne({ where: [{ email }] });
    if (existingMail) 
    {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
      nom,
      prenom,
      email,
      numeroTelephone,
    });
    await this.userRepository.save(newUser);
    return 'User added successfully';
  }

  // Valide les informations d'identification de l'utilisateur
  async validateUser(username: string, password: string): Promise<User | null> 
  {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user && (await bcrypt.compare(password, user.password))) 
    {
      return user; // L'utilisateur est valide
    }
    return null;
  }

  // Recherche un utilisateur par son nom
  async findByUsername(username: string): Promise<User | undefined> 
  {
    return this.userRepository.findOne({ where: { username } });
  }

  async findUserById(id: number): Promise<User | undefined> 
  {
    return this.userRepository.findOne({ where: { id } });
  }

  async findIdByUsername(username: string): Promise<number | null> {
    const user = await this.userRepository.findOne({
      where: { username },
      select: ['id'], // On ne récupère que l'ID pour plus d'efficacité
    });
    return user ? user.id : null;
  }

   // Méthode pour récupérer toutes les informations d'un utilisateur à partir de l'ID
   async findUserInfoById(id: number): Promise<Partial<User> | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'username', 'password', 'nom', 'prenom', 'email', 'numeroTelephone'],
    });
    return user || null; // Si l'utilisateur existe, on retourne ses informations
  }
}