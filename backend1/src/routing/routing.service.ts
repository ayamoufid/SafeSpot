import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RouteRequestDto } from './dto/route-request.dto';

@Injectable()
export class RoutingService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) {}

  async findRoute(routeRequest: RouteRequestDto) {
    const { startLat, startLon, endLat, endLon, mode } = routeRequest;
    const costColumn = mode === 'safe' ? 'safe_cost' : 'length_m';

    const query = `
      WITH 
      start_point AS (
        SELECT id FROM ways_vertices_pgr 
        ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint($1, $2), 4326) LIMIT 1
      ),
      end_point AS (
        SELECT id FROM ways_vertices_pgr 
        ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint($3, $4), 4326) LIMIT 1
      )
      SELECT 
        path_seq,
        node,
        edge,
        cost,
        agg_cost,
        ST_AsGeoJSON(w.the_geom) as geometry,
        ST_Length(w.the_geom::geography) as segment_length,
        w.name as street_name,
        CASE 
          WHEN z."riskLevel" IS NOT NULL THEN z."riskLevel"
          ELSE 0 
        END as risk_level
      FROM pgr_dijkstra(
        'SELECT gid, source, target, ' || $5 || ' as cost, 
         CASE 
           WHEN one_way = -1 THEN ' || $5 || '
           WHEN one_way = 1 THEN -1 
           ELSE ' || $5 || '
         END as reverse_cost
         FROM ways',
        (SELECT id FROM start_point),
        (SELECT id FROM end_point),
        true
      ) AS di
      JOIN ways w ON w.gid = di.edge
      LEFT JOIN zone z ON ST_Intersects(w.the_geom, z.center::geometry)
      ORDER BY path_seq;
    `;

    const result = await this.dataSource.query(query, [
      startLon,
      startLat,
      endLon,
      endLat,
      costColumn
    ]);

    // Calculer les statistiques du trajet
    const totalDistance = result.reduce((acc, curr) => acc + curr.segment_length, 0);
    const avgRiskLevel = result.reduce((acc, curr) => acc + curr.risk_level, 0) / result.length;

    return {
      route: {
        type: 'FeatureCollection',
        features: result.map(row => ({
          type: 'Feature',
          geometry: JSON.parse(row.geometry),
          properties: {
            pathSequence: row.path_seq,
            cost: row.cost,
            aggregateCost: row.agg_cost,
            streetName: row.street_name,
            riskLevel: row.risk_level,
            segmentLength: row.segment_length
          }
        }))
      },
      metadata: {
        totalDistance: Math.round(totalDistance), // en mètres
        averageRiskLevel: Number(avgRiskLevel.toFixed(2)),
        numberOfSegments: result.length,
        routeType: mode
      }
    };
  }
}