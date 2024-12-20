import { Controller, Post, Body } from '@nestjs/common';
import { AuthentService } from './authent.service';

@Controller('authent')
export class AuthentController 
{
  constructor(private readonly authentService: AuthentService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('email') email: string,
    @Body('numeroTelephone') numeroTelephone: string,
  ) 
  {
    return this.authentService.register(username, password, nom, prenom, email, numeroTelephone);
  }

  @Post('/login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string }> 
  {
    return this.authentService.login(username, password);
  }
}
