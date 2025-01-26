import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { RoutingService } from './routing.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  }
})
export class RoutingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly routingService: RoutingService) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  @SubscribeMessage('trackRoute')
  async handleRouteTracking(@MessageBody() routeRequest: {
    startLat: number, 
    startLon: number, 
    endLat: number, 
    endLon: number,
    mode?: 'normal' | 'safe'
  }) {
    console.log('Tracking route request received:', routeRequest);

    try {
      // Initial route calculation
      const initialRoute = await this.routingService.findRoute({
        startLat: routeRequest.startLat,
        startLon: routeRequest.startLon,
        endLat: routeRequest.endLat,
        endLon: routeRequest.endLon,
        mode: routeRequest.mode || 'normal'
      });

      console.log('Initial route calculated', JSON.stringify(initialRoute));

      // Send initial route
      this.server.emit('initialRoute', initialRoute);

      // Method to check route safety periodically
      const checkRouteSafety = async () => {
        try {
          const updatedRoute = await this.routingService.findSafestRoute({
            startLat: routeRequest.startLat,
            startLon: routeRequest.startLon,
            endLat: routeRequest.endLat,
            endLon: routeRequest.endLon,
            mode: routeRequest.mode || 'normal'
          });

          console.log('Route safety check performed');

          // Compare risk levels of current route segments
          const hasRiskChanged = updatedRoute.route.features.some(
            segment => segment.properties.riskLevel > 0
          );

          console.log('Risk changed:', hasRiskChanged);

          if (hasRiskChanged) {
            // Emit new route if risk levels have changed
            this.server.emit('routeUpdated', updatedRoute);
            console.log('Route updated event emitted');
          }
        } catch (error) {
          console.error('Error in safety check:', error);
        }
      };

      // Start periodic safety checks (e.g., every 30 seconds)
      const safetyCheckInterval = setInterval(checkRouteSafety, 30000);

      // Return unsubscribe method
      return {
        unsubscribe: () => {
          clearInterval(safetyCheckInterval);
        }
      };
    } catch (error) {
      console.error('Error in route tracking:', error);
      throw error;
    }
  }

  @SubscribeMessage('stopTracking')
  handleStopTracking() {
    // Clean up any ongoing tracking
    this.server.emit('trackingStopped');
  }
}