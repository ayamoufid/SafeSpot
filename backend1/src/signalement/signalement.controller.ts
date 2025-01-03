import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common';
import { SignalementService } from './signalement.service';
import { CreateSignalementDto } from './dto/create-signalement.dto';

@Controller('signalements')
export class SignalementController 
{
  constructor(private readonly signalementService: SignalementService) {}

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

  @Put(':id')
  async updateSignalement(@Param('id') id: number, @Body() updateSignalementDto: CreateSignalementDto) {
    return await this.signalementService.update(id, updateSignalementDto);
  }

  @Delete(':id')
  async deleteSignalement(@Param('id') id: number) {
    return await this.signalementService.delete(id);
  }
}