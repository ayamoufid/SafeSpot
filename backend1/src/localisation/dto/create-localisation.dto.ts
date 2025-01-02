import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateLocalisationDto {
  @IsNumber()
  @IsNotEmpty()
  longitude: number;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNotEmpty()
  userId: number;
}
