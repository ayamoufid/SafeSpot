import { Controller, Get, Query } from '@nestjs/common';
import { SafespotService } from './safespot.service';

@Controller('safespots')
export class SafespotController {
  constructor(private readonly safeSpotService: SafespotService) {}

  @Get('fetch')
  async fetchAndSaveSafeSpots(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    const safeSpots = await this.safeSpotService.fetchSafeSpots(lat, lon);
    await this.safeSpotService.saveSafeSpots(safeSpots);
    return { message: 'SafeSpots fetched and saved successfully', data: safeSpots };
  }
}
