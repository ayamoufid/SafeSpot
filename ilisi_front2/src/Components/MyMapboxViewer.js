// import React, { Component } from 'react';
// import { View, StyleSheet, Text } from 'react-native';
// import MapView, { UrlTile, Marker } from 'react-native-maps';
// import MapboxService from '../Services/MapService';

// class MyMapboxViewer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null,
//       errorMessage: null,
//     };
//   }

//   async componentDidMount() {
//     const location = await MapboxService.getLocation();
//     if (location) {
//       this.setState({ location });
//     } else {
//       this.setState({ errorMessage: 'Failed to get location' });
//     }
//   }

//   render() {
//     const { location, errorMessage } = this.state;

//     return (
//       <View style={styles.container}>
//         {location ? (
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//           >
//             {/* Mapbox Tile Source */}
//             <UrlTile
//               /**
//                * Mapbox Tile URL: Include your token
//                */
//               urlTemplate={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw`}
//               maximumZ={19}
//               flipY={false}
//             />
//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="My Location"
//               description="You are here!"
//             />
//           </MapView>
//         ) : (
//           <Text style={styles.error}>{errorMessage || 'Loading map...'}</Text>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   error: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default MyMapboxViewer;




// import React, { Component } from 'react';
// import { View, StyleSheet, Button, Text } from 'react-native';
// import MapView, { Marker, Polyline } from 'react-native-maps';
// import MapboxService from '../Services/MapService';

// const MAPBOX_ACCESS_TOKEN =
//   'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';

// class MyMapboxViewer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null,
//       destination: null,
//       polylineCoordinates: [],
//       errorMessage: null,
//     };
//   }

//   async componentDidMount() {
//     const location = await MapboxService.getLocation();
//     if (location) {
//       this.setState({ location });
//     } else {
//       this.setState({ errorMessage: 'Failed to get location' });
//     }
//   }

//   handleMapPress = async (e) => {
//     const { location } = this.state;
//     const { latitude, longitude } = e.nativeEvent.coordinate;

//     // Set the destination to the tapped coordinates
//     this.setState({
//       destination: { latitude, longitude },
//       polylineCoordinates: [],
//     });

//     // Fetch the route using Mapbox Directions API
//     const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

//     const response = await fetch(directionsUrl);
//     const data = await response.json();

//     if (data.routes.length > 0) {
//       const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
//         latitude: coord[1],
//         longitude: coord[0],
//       }));
//       this.setState({ polylineCoordinates: coordinates });
//     } else {
//       this.setState({ errorMessage: 'Failed to fetch route' });
//     }
//   };

//   render() {
//     const { location, destination, polylineCoordinates, errorMessage } = this.state;

//     return (
//       <View style={styles.container}>
//         {/* Map View */}
//         {location ? (
//           <MapView
//             style={styles.map}
//             initialRegion={{
//               latitude: location.coords.latitude,
//               longitude: location.coords.longitude,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             onPress={this.handleMapPress} // Capture tap on the map
//           >
//             {/* Marker for Current Location */}
//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="My Location"
//             />

//             {/* Marker for Destination */}
//             {destination && (
//               <Marker coordinate={destination} title="Destination" pinColor="blue" />
//             )}

//             {/* Route Polyline */}
//             {polylineCoordinates.length > 0 && (
//               <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
//             )}
//           </MapView>
//         ) : (
//           <Text style={styles.error}>{errorMessage || 'Loading map...'}</Text>
//         )}
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   map: {
//     flex: 1,
//   },
//   error: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default MyMapboxViewer;














// MapBoxViewer.js
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import MapboxService from '../Services/MapService';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';

class MapBoxViewer extends React.Component {

  handleMapPress = async (e) => {
    const { location } = this.props;
    const { latitude, longitude } = e.nativeEvent.coordinate;

    // Mettre à jour la destination et réinitialiser les coordonnées du polyline
    this.setState({
      destination: { latitude, longitude },
      polylineCoordinates: [],
    });

    // Demander l'itinéraire à l'API Mapbox Directions
    const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    const response = await fetch(directionsUrl);
    const data = await response.json();

    if (data.routes.length > 0) {
      const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
        latitude: coord[1],
        longitude: coord[0],
      }));
      this.setState({ polylineCoordinates: coordinates });
    } else {
      this.setState({ errorMessage: 'Failed to fetch route' });
    }
  };

  renderRiskZones = (zones, color) =>
    zones.map((zone) => (
      <Circle
        key={zone.id}
        center={zone.center}
        radius={1000} // Rayon en mètres
        strokeWidth={1} // Largeur de la bordure
        strokeColor={color} // Couleur de la bordure
        fillColor={`${color}50`} // Couleur de remplissage avec transparence
      />
    ));

  render() {
    const { location, destination, polylineCoordinates, errorMessage } = this.props;

    // Définir les zones à faible, moyen et haut risque
    const safeZones = [
      {
        id: 1,
        city: 'Casablanca',
        center: { latitude: 33.5428, longitude: -7.6436 },
        riskLevel: 0,
      },
    ];

    const mediumRiskZones = [
      {
        id: 2,
        city: 'Casablanca ⵜⴰⴷⴷⴰⵔⵜ ⵜⵓⵎⵍⵉⵍⵜ',
        center: { latitude: 33.6228, longitude: -7.4936 },
        riskLevel: 2,
      },
    ];

    const highRiskZones = [
      {
        id: 3,
        city: 'El Mansouria ⵎⵏⵚⵓⵕⵢⵢⴰ',
        center: { latitude: 33.7088, longitude: -7.3163 },
        riskLevel: 3,
      },
    ];

    return (
      <View style={styles.container}>
        {/* MapView */}
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={this.handleMapPress} // Capture la pression sur la carte
          >
            {/* Zones de risque */}
            {this.renderRiskZones(safeZones, 'rgba(0, 255, 0, 0.3)')} {/* Vert */}
            {this.renderRiskZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')} {/* Orange */}
            {this.renderRiskZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')} {/* Rouge */}

            {/* Marqueur pour la position actuelle */}
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="My Location"
            />

            {/* Marqueur pour la destination */}
            {destination && (
              <Marker coordinate={destination} title="Destination" pinColor="blue" />
            )}

            {/* Polyline pour l'itinéraire */}
            {polylineCoordinates.length > 0 && (
              <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
            )}
          </MapView>
        ) : (
          // Message d'erreur ou de chargement
          <Text style={styles.error}>{errorMessage || 'Loading map...'}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  error: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
});

export default MapBoxViewer;
