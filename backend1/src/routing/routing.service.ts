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
        di.path_seq,
        di.node,
        di.edge,
        di.cost AS path_cost,
        di.agg_cost,
        ST_AsGeoJSON(w.the_geom) as geometry,
        ST_Length(w.the_geom::geography) as segment_length,
        w.name as street_name,
        CASE 
          WHEN z."riskLevel" IS NOT NULL THEN z."riskLevel"
          ELSE 0 
        END as risk_level
      FROM pgr_dijkstra(
        'SELECT gid as id, source, target, ' || $5 || ' as cost, 
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
      ORDER BY di.path_seq;
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
            cost: row.path_cost,
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


async findSafestRoute(routeRequest: RouteRequestDto) {
  const { startLat, startLon, endLat, endLon, mode } = routeRequest;
    
    // Définir la fonction de coût en fonction du mode
    const costFunction = mode === 'safe' 
      ? `CASE 
          WHEN z."riskLevel" IS NOT NULL 
          THEN length_m * (1 + z."riskLevel"::float * 0.5)
          ELSE length_m 
        END`
      : 'length_m'; // Mode normal: utilise simplement la longueur

    // SQL query pour trouver la route
    const query = `
      WITH
        start_vertex AS (
          SELECT id 
          FROM ways_vertices_pgr
          ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint($1, $2), 4326) 
          LIMIT 1
        ),
        end_vertex AS (
          SELECT id 
          FROM ways_vertices_pgr
          ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint($3, $4), 4326) 
          LIMIT 1
        )
      SELECT 
        seq AS path_sequence,
        edge AS edge_id,
        e.cost,
        agg_cost AS aggregate_cost,
        w.name AS street_name,
        ST_AsGeoJSON(w.the_geom)::json AS geometry,
        ST_Length(w.the_geom::geography) AS segment_length,
        COALESCE(z."riskLevel", 0) AS risk_level
      FROM pgr_dijkstra(
        'SELECT 
          gid AS id,
          source,
          target,
          ${costFunction} AS cost,
          CASE 
            WHEN one_way = 1 THEN -1
            WHEN one_way = -1 THEN ${costFunction}
            ELSE ${costFunction}
          END AS reverse_cost
        FROM ways w
        LEFT JOIN zone z ON ST_Intersects(w.the_geom, z.center::geometry)',
        (SELECT id FROM start_vertex),
        (SELECT id FROM end_vertex),
        true
      ) AS e
      JOIN ways w ON e.edge = w.gid
      LEFT JOIN zone z ON ST_Intersects(w.the_geom, z.center::geometry)
      WHERE edge >= 0
      ORDER BY seq;
    `;

    const results = await this.dataSource.query(query, [
      startLon,
      startLat,
      endLon,
      endLat,
    ]);

    // Transformer les résultats en GeoJSON FeatureCollection
    const route = {
      type: 'FeatureCollection',
      features: results.map(row => ({
        type: 'Feature',
        geometry: row.geometry,
        properties: {
          pathSequence: row.path_sequence,
          cost: row.cost,
          aggregateCost: row.aggregate_cost,
          streetName: row.street_name,
          riskLevel: row.risk_level,
          segmentLength: row.segment_length
        }
      }))
    };

    // Calculer les métadonnées de la route
    const metadata = {
      totalDistance: Math.round(
        results.reduce((sum, row) => sum + row.segment_length, 0)
      ),
      averageRiskLevel: Number(
        (results.reduce((sum, row) => sum + row.risk_level, 0) / results.length).toFixed(2)
      ),
      numberOfSegments: results.length,
      routeType: mode
    };

    return {
      route,
      metadata
    };
  }
}