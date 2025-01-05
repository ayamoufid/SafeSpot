import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal } from './signal.entity';
import { CreateSignalementDto } from './dto/create-signalement.dto';
import { Zone } from './zone.entity';
import axios from 'axios';

@Injectable()
export class SignalementService 
{
  private readonly ZONE_RADIUS = 1000;
  constructor(
    @InjectRepository(Signal)
    private readonly signalementRepository: Repository<Signal>,

    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createSignalementDto: CreateSignalementDto): Promise<Signal> {
    // First, try to find an existing zone that contains the point
    const existingZone = await this.zoneRepository
      .createQueryBuilder('zone')
      .where(
        `ST_DWithin(
          zone.center::geography,
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326)::geography,
          :radius
        )`,
        {
          longitude: createSignalementDto.location.coordinates[0],
          latitude: createSignalementDto.location.coordinates[1],
          radius: this.ZONE_RADIUS
        }
        )
      //.andWhere('zone.riskLevel = :riskLevel', { riskLevel: 0 })
      .getOne();
  
    let zoneId: number;
  
    if (existingZone) 
    {
      // Use existing zone
      zoneId = existingZone.id;
    } 
    else 
    {
      const city = await this.getCityFromCoordinates(
        createSignalementDto.location.coordinates[1], // latitude
        createSignalementDto.location.coordinates[0]  // longitude
      );
  
      const newZone = this.zoneRepository.create({
        city,
        center: createSignalementDto.location,
        riskLevel: 0
      });
  
      const savedZone = await this.zoneRepository.save(newZone);
      zoneId = savedZone.id;
    }
  
      // Create and save the signal with the determined zoneId
      const signalement = this.signalementRepository.create({
        ...createSignalementDto,
        zoneId
      });
  
      return await this.signalementRepository.save(signalement);
    }
  
  private async getCityFromCoordinates(lat: number, lon: number): Promise<string> 
  {
    try {
      // Using Nominatim OpenStreetMap service for reverse geocoding
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        {
          headers: {
            'User-Agent': 'YourAppName/1.0'
          }
        }
      );
  
      if (response.data && response.data.address) {
        return response.data.address.city || 
                response.data.address.town || 
                response.data.address.village || 
                'Unknown';
      }
      
      return 'Unknown';
    } catch (error) {
      console.error('Error getting city name:', error);
      return 'Unknown';
    }
  }

  async findAll(): Promise<Signal[]> {
    return await this.signalementRepository.find({ relations: ['zone'] });
  }

  async findOne(id: number): Promise<Signal> {
    return await this.signalementRepository.findOne({ where: { id }, relations: ['zone'] });
  }

  async update(id: number, updateSignalementDto: CreateSignalementDto): Promise<Signal> {
    await this.signalementRepository.update(id, updateSignalementDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.signalementRepository.delete(id);
  }
}