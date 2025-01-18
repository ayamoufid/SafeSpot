import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Point } from 'geojson';
import { Signal } from './entities/signal.entity';
import { Zone } from './entities/zone.entity';
import { CreateSignalementDto } from './dto/create-signalement.dto';
import axios from 'axios';

@Injectable()
export class SignalementService {
  private readonly ZONE_RADIUS = 1000;
  private readonly proximity = 2500;
  private readonly SIGNAL_THRESHOLD = 10;

  constructor(
    @InjectRepository(Signal)
    private signalementRepository: Repository<Signal>,
    @InjectRepository(Zone)
    private zoneRepository: Repository<Zone>
  ) {}

  async create(createSignalementDto: CreateSignalementDto): Promise<Signal> {
    // Vérifier si le point est dans une zone existante
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
      .getOne();

    let zoneId: number;

    if (existingZone) {
      // Utiliser la zone existante
      zoneId = existingZone.id;
    } else {
      // Calculer un nouveau centre pour éviter les intersections
      const result = await this.zoneRepository.query(`
        WITH user_point AS (
          SELECT ST_SetSRID(ST_MakePoint($1, $2), 4326) AS geom
        ),
        nearest_zone AS (
          SELECT 
            center::geometry as zone_center,
            ST_Distance(
              center::geography,
              ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
            ) as dist
          FROM zone
          ORDER BY center::geography <-> ST_SetSRID(ST_MakePoint($1, $2), 4326)::geography
          LIMIT 1
        )
        SELECT 
          CASE 
            WHEN (SELECT COUNT(*) FROM zone) = 0 THEN $1
            ELSE ST_X(
              ST_SetSRID(
                ST_Project(
                  user_point.geom::geography,
                  GREATEST(COALESCE(nearest_zone.dist, 2000), 2000),
                  DEGREES(
                    COALESCE(
                      ST_Azimuth(nearest_zone.zone_center, user_point.geom),
                      0
                    )
                  )
                )::geometry,
                4326
              )
            )
          END as longitude,
          CASE 
            WHEN (SELECT COUNT(*) FROM zone) = 0 THEN $2
            ELSE ST_Y(
              ST_SetSRID(
                ST_Project(
                  user_point.geom::geography,
                  GREATEST(COALESCE(nearest_zone.dist, 2000), 2000),
                  DEGREES(
                    COALESCE(
                      ST_Azimuth(nearest_zone.zone_center, user_point.geom),
                      0
                    )
                  )
                )::geometry,
                4326
              )
            )
          END as latitude
        FROM user_point
        LEFT JOIN nearest_zone ON true;
      `,[
        createSignalementDto.location.coordinates[0],
        createSignalementDto.location.coordinates[1]
      ]);

      // Obtenir le nom de la ville
      const city = await this.getCityFromCoordinates(
        result[0].latitude,
        result[0].longitude
      );

      // Créer la nouvelle zone
      const newZone = this.zoneRepository.create({
        city,
        center: {
          type: 'Point',
          coordinates: [result[0].longitude, result[0].latitude]
        },
        riskLevel: 0
      });

      const savedZone = await this.zoneRepository.save(newZone);
      zoneId = savedZone.id;
    }

    // Créer le signalement
    const signalement = this.signalementRepository.create({
      ...createSignalementDto,
      zoneId
    });

    return await this.signalementRepository.save(signalement);
  }

  private async getCityFromCoordinates(lat: number, lon: number): Promise<string> {
    try {
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

  async findByUser(userId: number): Promise<Signal[]> {
    const signals = await this.signalementRepository
      .createQueryBuilder('signal')
      .leftJoinAndSelect('signal.zone', 'zone')
      .where('signal.userId = :userId', { userId })
      .orderBy('signal.date', 'DESC')
      .getMany();

    if (!signals) {
      throw new NotFoundException(`No signals found for user ${userId}`);
    }

    return signals;
  }

  async findByZone(zoneId: number): Promise<Signal[]> {
    const signals = await this.signalementRepository
      .createQueryBuilder('signal')
      .leftJoinAndSelect('signal.zone', 'zone')
      .where('signal.zoneId = :zoneId', { zoneId })
      .orderBy('signal.date', 'DESC')
      .getMany();

    if (!signals) {
      throw new NotFoundException(`No signals found for zone ${zoneId}`);
    }

    return signals;
  }

  async findByUserInZone(userId: number, zoneId: number): Promise<Signal[]> {
    const signals = await this.signalementRepository
      .createQueryBuilder('signal')
      .leftJoinAndSelect('signal.zone', 'zone')
      .where('signal.userId = :userId AND signal.zoneId = :zoneId', { userId, zoneId })
      .orderBy('signal.date', 'DESC')
      .getMany();
  
    if (!signals.length) {
      throw new NotFoundException(`No signals found for user ${userId} in zone ${zoneId}`);
    }
  
    return signals;
  }
  
  
  async update(id: number, updateSignalementDto: CreateSignalementDto): Promise<Signal> {
    await this.signalementRepository.update(id, updateSignalementDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.signalementRepository.delete(id);
  }

  async findHighRiskZones(threshold: number): Promise<Zone[]> {
    return await this.zoneRepository
      .createQueryBuilder('zone')
      .where('zone.riskLevel = :threshold', { threshold })
      .orderBy('zone.riskLevel', 'DESC')
      .getMany();
  }


  async countSignalsByUser(userId: number): Promise<number> {
    return await this.signalementRepository
      .createQueryBuilder('signal')
      .where('signal.userId = :userId', { userId })
      .getCount();
  }


  async findHighRiskZonesNearUser(
    threshold: number,
    userLocation: { type: 'Point'; coordinates: [number, number] },
  ): Promise<Zone[]> {
    return await this.zoneRepository
      .createQueryBuilder('zone')
      .where('zone.riskLevel = :threshold', { threshold })
      .andWhere(
        `ST_DWithin(
          zone.center,
          ST_SetSRID(ST_MakePoint(:longitude, :latitude), 4326),
          :proximity
        )`,
        {
          longitude: userLocation.coordinates[0],
          latitude: userLocation.coordinates[1],
          proximity: this.proximity,
        },
      )
      .orderBy('zone.riskLevel', 'DESC')
      .getMany();
  }

  async countSignalsPerZone(): Promise<{ zoneId: number; signalCount: number }[]> {
    return await this.signalementRepository
      .createQueryBuilder('signal')
      .select('signal.zoneId', 'zoneId')
      .addSelect('COUNT(signal.id)', 'signalCount')
      .groupBy('signal.zoneId')
      .getRawMany();
  }


  async countSignalsPerUser(): Promise<{ userId: number; signalCount: number }[]> {
    return await this.signalementRepository
      .createQueryBuilder('signal')
      .select('signal.userId', 'userId')
      .addSelect('COUNT(signal.id)', 'signalCount')
      .groupBy('signal.userId')
      .getRawMany();
  }

  async findSignalsByDateRange(startDate: string, endDate: string): Promise<Signal[]> {
    return await this.signalementRepository
      .createQueryBuilder('signal')
      .where('signal.date BETWEEN :startDate AND :endDate', { startDate, endDate })
      .orderBy('signal.date', 'DESC')
      .getMany();
  }

  async incrementRiskLevel(zoneId: number): Promise<void> {
    await this.zoneRepository
      .createQueryBuilder()
      .update(Zone)
      .set({ riskLevel: () => 'riskLevel + 1' })
      .where('id = :zoneId', { zoneId })
      .execute();
  }

  async findSignalsForToday(): Promise<Signal[]> {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const endOfToday = new Date(startOfToday);
    endOfToday.setDate(startOfToday.getDate() + 1);
  
    return this.signalementRepository
      .createQueryBuilder('signal')
      .where('signal.date >= :start AND signal.date < :end', {
        start: startOfToday,
        end: endOfToday,
      })
      .orderBy('signal.date', 'DESC')
      .getMany();
  }

  /*async findSignalsInLast60Minutes(): Promise<Signal[]> {
    const now = new Date();
    const thirtyMinutesAgo = new Date(now.getTime() - 60 * 60 * 1000);

    return this.signalementRepository
      .createQueryBuilder('signal')
      .where('signal.date >= :startTime', { startTime: thirtyMinutesAgo })
      .orderBy('signal.date', 'DESC')
      .getMany();
  }*/

    async findSignalsInLast60Minutes(): Promise<Signal[]> {
      const now = new Date(); // Heure actuelle locale
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
      const oneHourAgoUTC = new Date(
        oneHourAgo.getUTCFullYear(),
        oneHourAgo.getUTCMonth(),
        oneHourAgo.getUTCDate(),
        oneHourAgo.getUTCHours(),
        oneHourAgo.getUTCMinutes(),
        oneHourAgo.getUTCSeconds(),
      );  
      return this.signalementRepository
        .createQueryBuilder('signal')
        .where('signal.date >= :startTime', { startTime: oneHourAgoUTC })
        .orderBy('signal.date', 'DESC')
        .getMany();
    }
      

    async findSignalsInLast60MinutesForZone(zoneId: number): Promise<Signal[]> {
      const now = new Date(); // Heure actuelle locale
      const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    
      // Convertir l'heure locale en UTC pour la comparaison
      const oneHourAgoUTC = new Date(
        oneHourAgo.getUTCFullYear(),
        oneHourAgo.getUTCMonth(),
        oneHourAgo.getUTCDate(),
        oneHourAgo.getUTCHours(),
        oneHourAgo.getUTCMinutes(),
        oneHourAgo.getUTCSeconds(),
      );
    
      return this.signalementRepository
        .createQueryBuilder('signal')
        .where('signal.date >= :startTime', { startTime: oneHourAgoUTC })
        .andWhere('signal.zoneId = :zoneId', { zoneId })
        .orderBy('signal.date', 'DESC')
        .getMany();
    }
    
    async checkAndIncrementRiskLevel(): Promise<void> {
      const signalCounts = await this.countSignalsPerZone();
    
      for (const { zoneId, signalCount } of signalCounts) {
        if (signalCount >= this.SIGNAL_THRESHOLD) {
          await this.incrementRiskLevel(zoneId);
          console.log(`Risque augmenté pour la zone ${zoneId} (nombre de signaux : ${signalCount})`);
        }
      }
    }

  
}