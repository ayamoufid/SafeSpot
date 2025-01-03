import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignalementController } from './signalement.controller';
import { SignalementService } from './signalement.service';
import { Signal } from './signal.entity';
import { Zone } from './zone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Signal, Zone])],
  controllers: [SignalementController],
  providers: [SignalementService],
})
export class SignalementModule {}

