
export class RouteRequestDto {
    startLat: number;
    startLon: number;
    endLat: number;
    endLon: number;
    mode?: 'normal' | 'safe' = 'normal';
  }