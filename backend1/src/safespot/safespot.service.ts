import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SafeSpot } from './safespot.entity';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SafespotService {
  private readonly SEARCH_RADIUS = 2500;

  constructor(
    @InjectRepository(SafeSpot)
    private readonly safeSpotRepository: Repository<SafeSpot>,
    private readonly httpService: HttpService,
  ) {}

  // Méthode pour récupérer les SafeSpots depuis Overpass API
  async fetchSafeSpots(lat: number, lon: number): Promise<any[]> {
    // Types d’établissements à rechercher
    const amenityTypes = [
      'police', // Postes de police
      'hospital', // Hôpitaux
      'train_station', // Gares ferroviaires
      'bus_station', // Gares routières
      'shopping_mall', // Centres commerciaux
      'fire_station', // Casernes de pompiers
      'university', // Universités
      'school', // Écoles
      'townhall', // Mairies
    ];

    // Construction de la requête Overpass
    const query = `
      [out:json];
      (
        ${amenityTypes.map((type) => `node["amenity"="${type}"](around:${this.SEARCH_RADIUS},${lat},${lon});`).join('\n')}
      );
      out body;
    `;
    const url = `https://overpass-api.de/api/interpreter`;

    // Appel à Overpass API
    const response = await firstValueFrom(
      this.httpService.post(url, query, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }),
    );

    // Transformation des données
    return response.data.elements.map((element) => ({
      id: element.id,
      name: element.tags.name || 'Unknown',
      lat: element.lat,
      lon: element.lon,
      type: element.tags.amenity || 'unknown',
    }));
  }

  // Méthode pour enregistrer les SafeSpots dans la base de données
  async saveSafeSpots(safeSpots: any[]) {
    for (const spot of safeSpots) {
      const safeSpot = this.safeSpotRepository.create({
        name: spot.name,
        location: { type: 'Point', coordinates: [spot.lon, spot.lat] },
        type: spot.type,
      });
      await this.safeSpotRepository.save(safeSpot);
    }
  }
}
