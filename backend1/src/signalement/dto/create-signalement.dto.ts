import { IsString, IsOptional, IsNumber } from 'class-validator';
import { Point } from 'geojson';

export class CreateSignalementDto {
  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  zoneId?: number;

  @IsNumber()
  userId: number;

  location: Point;
}
