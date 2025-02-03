import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthentController } from './authent.controller';
import { AuthentService } from './authent.service';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    JwtModule.register({
      secret: 'eduhhehifiilso',
      signOptions: { expiresIn: '50m' },
    }),
    UserModule,
  ],
  controllers: [AuthentController],
  providers: [AuthentService, JwtStrategy],
})
export class AuthentModule {}
