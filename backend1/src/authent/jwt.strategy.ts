import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) 
{
    constructor(private readonly userService: UserService) 
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: 'your-secret-key', // Hardcoded secret key
        });
    }
    async validate(payload: { username: string; sub: number }): Promise<User> 
    {
        return this.userService.findByUsername(payload.username);
    }
}