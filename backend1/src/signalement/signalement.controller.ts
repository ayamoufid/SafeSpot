import { Controller, Post, Body, Get, Param, Put, Delete, Query } from '@nestjs/common';
import { SignalementService } from './signalement.service';
import { CreateSignalementDto } from './dto/create-signalement.dto';

@Controller('signalements')
export class SignalementController 
{
  constructor(private readonly signalementService: SignalementService) {}

  @Get('today')
  async findSignalsForToday() {
    return await this.signalementService.findSignalsForToday();
  }

  @Get('last-30-minutes') // non teste
  async findSignalsInLast30Minutes() {
    return await this.signalementService.findSignalsInLast30Minutes();
  }

  @Post()
  async createSignalement(@Body() createSignalementDto: CreateSignalementDto) {
    return await this.signalementService.create(createSignalementDto);
  }

  @Get()
  async findAll() {
    return await this.signalementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.signalementService.findOne(id);
  }

  @Get('user/:userId')
  async findByUser(@Param('userId') userId: number) {
    return await this.signalementService.findByUser(userId);
  }

  @Get('zone/:zoneId')
  async findByZone(@Param('zoneId') zoneId: number) {
    return await this.signalementService.findByZone(zoneId);
  }

  @Get('user/:userId/zone/:zoneId')
  async findByUserInZone(@Param('userId') userId: number, @Param('zoneId') zoneId: number) {
    return await this.signalementService.findByUserInZone(userId, zoneId);
  }

  @Put(':id')
  async updateSignalement(@Param('id') id: number, @Body() updateSignalementDto: CreateSignalementDto) {
    return await this.signalementService.update(id, updateSignalementDto);
  }

  @Delete(':id')
  async deleteSignalement(@Param('id') id: number) {
    return await this.signalementService.delete(id);
  }

  @Get('zones/high-risk/:threshold')
  async findHighRiskZones(@Param('threshold') threshold: number) {
    return await this.signalementService.findHighRiskZones(threshold);
  }

  @Get('zones/signal-count')
  async countSignalsPerZone() {
    return await this.signalementService.countSignalsPerZone();
  }

  @Get('date-range') //pas encore traite
  async findSignalsByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string) {
    return await this.signalementService.findSignalsByDateRange(startDate, endDate);
  }

}