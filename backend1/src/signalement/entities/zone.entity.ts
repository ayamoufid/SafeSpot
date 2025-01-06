import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity()
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  city: string;

  @Column('geography', { spatialFeatureType: 'Point', srid: 4326 })
  center: Point;

  @Column({ name: 'riskLevel' })
  riskLevel: number; // 0 faible, 1 : modere, 2 : eleve
}
