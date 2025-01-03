import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Zone } from './zone.entity';
import { Point } from 'geojson';

@Entity()
export class Signal{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column({ nullable: true })
  description?: string;

  @Column('geography', { spatialFeatureType: 'Point', srid: 4326 })
  location: Point;

  @ManyToOne(() => Zone)
  @JoinColumn({ name: 'zoneId' })
  zone: Zone;

  @Column()
  zoneId: number;

  @Column()
  userId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}