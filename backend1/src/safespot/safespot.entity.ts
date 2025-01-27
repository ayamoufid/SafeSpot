import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Point } from 'geojson';

@Entity()
export class SafeSpot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('geography', { spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @Column()
  type: string;
}
