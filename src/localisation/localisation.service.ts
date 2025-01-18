import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localisation } from './localisation.entity';
import { CreateLocalisationDto } from './dto/create-localisation.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class LocalisationService {
  constructor(
    @InjectRepository(Localisation)
    private readonly localisationRepository: Repository<Localisation>,
    private readonly userService: UserService,
  ) {}

  async create(createLocalisationDto: CreateLocalisationDto): Promise<Localisation> {
    const user = await this.userService.findUserById(createLocalisationDto.userId);
    if (!user) 
        {
      throw new Error('User not found');
    }

    const localisation = this.localisationRepository.create({
      longitude: createLocalisationDto.longitude,
      latitude: createLocalisationDto.latitude,
      user,
    });

    return this.localisationRepository.save(localisation);
  }

  async findAll(): Promise<Localisation[]> {
    return this.localisationRepository.find({ relations: ['user'] });
  }
}
