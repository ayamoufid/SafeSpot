import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Signal } from './signal.entity';
import { CreateSignalementDto } from './dto/create-signalement.dto';
import { Zone } from './zone.entity';

@Injectable()
export class SignalementService {
  constructor(
    @InjectRepository(Signal)
    private readonly signalementRepository: Repository<Signal>,

    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  async create(createSignalementDto: CreateSignalementDto): Promise<Signal> {
    const signalement = this.signalementRepository.create(createSignalementDto);
    return await this.signalementRepository.save(signalement);
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