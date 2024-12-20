import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthentService 
{
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(username: string, password: string): Promise<{ accessToken: string }> 
  {
    const user = await this.userService.validateUser(username, password);
    if (!user) 
        {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { username: user.username, sub: user.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }

  async register(username: string, password: string, nom: string, prenom: string, mail: string, tel: string): Promise<string> {
    return this.userService.addUser(username, password,nom,prenom,mail,tel);
  }
}
