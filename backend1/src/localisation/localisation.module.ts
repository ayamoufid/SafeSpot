import { Module } from '@nestjs/common';
import { LocalisationController } from './localisation.controller';
import { LocalisationService } from './localisation.service';
import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localisation } from './localisation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Localisation]), UserModule],
  controllers: [LocalisationController],
  providers: [LocalisationService]
})
export class LocalisationModule {}
