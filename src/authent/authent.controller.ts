import { Controller, Post, Body, Get, Query, NotFoundException } from '@nestjs/common';
import { AuthentService } from './authent.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Controller('authent')
export class AuthentController {
  constructor(
    private readonly authentService: AuthentService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('email') email: string,
    @Body('numeroTelephone') numeroTelephone: string,
  ) {
    return this.authentService.register(username, password, nom, prenom, email, numeroTelephone);
  }

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> {
    return this.authentService.login(username, password);
  }

  // Fonction pour récupérer l'ID à partir du nom d'utilisateur
  @Get('get-id')
  async getIdByUsername(@Query('username') username: string): Promise<{ id: number }> {
    const id = await this.userService.findIdByUsername(username);
    if (!id) {
      throw new NotFoundException('User with username ${username} not found');
    }
    return { id };
  }

  // Fonction pour récupérer toutes les informations de l'utilisateur par ID
  @Get('get-user-info')
  async getUserInfoById(@Query('id') id: number): Promise<Partial<User>> {
    const user = await this.userService.findUserInfoById(id);
    if (!user) {
      throw new NotFoundException('User with ID ${id} not found');
    }
    return user;
  }
}