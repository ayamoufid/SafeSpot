import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthentModule } from './authent/authent.module';
import { UserModule } from './user/user.module';
import { LocalisationModule } from './localisation/localisation.module';
import { SignalementModule } from './signalement/signalement.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', 
      port: 5432,
      username: 'safespot_user',
      password: 'safespot_password',
      database: 'safe_spot',
      synchronize: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    UserModule,
    AuthentModule,
    LocalisationModule,
    SignalementModule,
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}



