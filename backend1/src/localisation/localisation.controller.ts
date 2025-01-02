import { Controller, Post, Body, Get } from '@nestjs/common';
import { LocalisationService } from './localisation.service';
import { CreateLocalisationDto } from './dto/create-localisation.dto';

@Controller('localisation')
export class LocalisationController {
  constructor(private readonly localisationService: LocalisationService) {}

  @Post()
  async create(@Body() createLocalisationDto: CreateLocalisationDto) {
    return this.localisationService.create(createLocalisationDto);
  }

  @Get()
  async findAll() 
  {
    return this.localisationService.findAll();
  }
}
