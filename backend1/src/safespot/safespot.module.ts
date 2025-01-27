import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { SafespotService } from './safespot.service';
import { SafespotController } from './safespot.controller';
import { SafeSpot } from './safespot.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([SafeSpot]),
    HttpModule,
  ],
  providers: [SafespotService],
  controllers: [SafespotController],
  exports: [SafespotService],
})
export class SafespotModule {}
