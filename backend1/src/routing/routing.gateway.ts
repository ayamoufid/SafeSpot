import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoutingService } from './routing.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class RoutingGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly routingService: RoutingService) {}

  @SubscribeMessage('trackRoute')
  async handleRouteTracking(@MessageBody() routeRequest: {
    startLat: number, 
    startLon: number, 
    endLat: number, 
    endLon: number,
    mode?: 'normal' | 'safe'
  }) {
    // Initial route calculation
    const initialRoute = await this.routingService.findRoute({
      startLat: routeRequest.startLat,
      startLon: routeRequest.startLon,
      endLat: routeRequest.endLat,
      endLon: routeRequest.endLon,
      mode: routeRequest.mode || 'normal'
    });

    // Send initial route
    this.server.emit('initialRoute', initialRoute);

    // Method to check route safety periodically
    const checkRouteSafety = async () => {
      const updatedRoute = await this.routingService.findRoute({
        startLat: routeRequest.startLat,
        startLon: routeRequest.startLon,
        endLat: routeRequest.endLat,
        endLon: routeRequest.endLon,
        mode: routeRequest.mode || 'normal'
      });

      // Compare risk levels of current route segments
      const hasRiskChanged = updatedRoute.route.features.some(
        segment => segment.properties.riskLevel > 0
      );

      if (hasRiskChanged) {
        // Emit new route if risk levels have changed
        this.server.emit('routeUpdated', updatedRoute);
      }
    };

    // Start periodic safety checks (every 30 seconds)
    const safetyCheckInterval = setInterval(checkRouteSafety, 30000);

    // Handle client disconnection
    return {
      unsubscribe: () => {
        clearInterval(safetyCheckInterval);
      }
    };
  }

  @SubscribeMessage('stopTracking')
  handleStopTracking() {
    // Clean up any ongoing tracking
    this.server.emit('trackingStopped');
  }
}