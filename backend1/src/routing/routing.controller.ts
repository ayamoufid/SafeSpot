// src/routing/routing.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { RoutingService } from './routing.service';
import { RouteRequestDto } from './dto/route-request.dto';

@Controller('routing')
export class RoutingController {
  constructor(private readonly routingService: RoutingService) {}

  @Post('route')
  async calculateRoute(@Body() routeRequest: RouteRequestDto) {
    return this.routingService.findRoute(routeRequest);
  }

  @Post('safestroute')
  async calculateSafestRoute(@Body() routeRequest: RouteRequestDto) {
    return this.routingService.findSafestRoute(routeRequest);
  }
}