// src/routing/routing.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoutingController } from './routing.controller';
import { RoutingService } from './routing.service';
import { RoutingGateway } from './routing.gateway';

@Module({
  imports: [TypeOrmModule.forFeature()],
  controllers: [RoutingController],
  providers: [RoutingService, RoutingGateway],
})
export class RoutingModule {}
