// src/routing/routing.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutingController } from './routing.controller';
import { RoutingService } from './routing.service';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [RoutingController],
  providers: [RoutingService],
})
export class RoutingModule {}
