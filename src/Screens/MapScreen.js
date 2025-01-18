// import React , { Suspense } from 'react';
// import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
// //import MyMapboxViewer from '../Components/MyMapboxViewer';
// import TabNavigator from '../Components/TabNavigator';
// import SearchBar from '../Components/SearchBar';
// import LoginScreen from './LoginScreen';

// import { useSelector } from 'react-redux'; // Importer useSelector



// const MyMapboxViewer = React.lazy(() => import('../Components/MyMapboxViewer'));

// const MapScreen = ({ navigation }) => {
//     const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);
//     console.log(isLoggedIn);
//     // Redirect to login screen if not logged in
//     if (!isLoggedIn) {
//     // You can use navigation to redirect to the login screen
//     navigation.navigate('Login');
//     }
//   return (  
//     <SafeAreaView style={styles.container}>
//       {/* <SearchBar /> */}
//       <View style={styles.mapContainer}>
//         {isLoggedIn ? (
//           <Suspense fallback={<Text>Loading map...</Text>}>
//             <MyMapboxViewer />
//           </Suspense>
//         ) : (
//         <View style={styles.centered}>
//           <Text>You are not logged in. Please log in to continue.</Text>
//             {/* You can redirect the user to the login page if needed */}
//           </View>
//       )}
//       </View>
//       <TabNavigator />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   mapContainer: {
//     flex: 1,
//     width: '100%',
//   },
// });

// export default MapScreen;

// import React, { Component } from 'react';
// import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
// import MapboxService from '../Services/MapService';
// import TabNavigator from '../Components/TabNavigator'; // Ajout du TabNavigator

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';

// class CombinedMapScreen extends Component {
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
//     try {
//       const location = await MapboxService.getLocation();
//       if (location) {
//         this.setState({ location });
//       } else {
//         this.setState({ errorMessage: 'Failed to get location' });
//         Alert.alert('Error', 'Failed to get location. Please try again.');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: 'Error retrieving location' });
//       Alert.alert('Error', 'Error retrieving location.');
//     }
//   }

//   handleMapPress = async (e) => {
//     const { location } = this.state;
//     const { latitude, longitude } = e.nativeEvent.coordinate;

//     this.setState({
//       destination: { latitude, longitude },
//       polylineCoordinates: [],
//     });

//     try {
//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const response = await fetch(directionsUrl);
//       const data = await response.json();

//       if (data.routes && data.routes.length > 0) {
//         const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
//           latitude: coord[1],
//           longitude: coord[0],
//         }));
//         this.setState({ polylineCoordinates: coordinates });
//       } else {
//         this.setState({ errorMessage: 'Failed to fetch route' });
//         Alert.alert('Error', 'Failed to fetch route.');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: 'Error fetching route' });
//       Alert.alert('Error', 'Error fetching route.');
//     }
//   };

//   renderRiskZones = (zones, color) =>
//     zones.map((zone) => (
//       <Circle
//         key={zone.id}
//         center={zone.center}
//         radius={1000}
//         strokeWidth={1}
//         strokeColor={color}
//         fillColor={`${color}50`}
//       />
//     ));

//   render() {
//     const { location, destination, polylineCoordinates, errorMessage } = this.state;

   
// ////////////////////////////////////////////////////////////////////////////


//     const safeZones = [
//       { id: 1, city: 'Casablanca', center: { latitude: 33.5428, longitude: -7.6436 }, riskLevel: 0 },
      
//     ];

//     const mediumRiskZones = [
//       { id: 2, city: 'Casablanca ⵜⴰⴷⴷⴰⵔⵜ ⵜⵓⵎⵍⵉⵍⵜ', center: { latitude: 33.6228, longitude: -7.4936 }, riskLevel: 2 },
//     ];

//     const highRiskZones = [
//       { id: 3, city: 'El Mansouria ⵎⵏⵚⵓⵕⵢⵢⴰ', center: { latitude: 33.7088, longitude: -7.3163 }, riskLevel: 3 },
//     ];




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
//             onPress={this.handleMapPress}
//           >
//             {this.renderRiskZones(safeZones, 'rgba(0, 255, 0, 0.3)')}
//             {this.renderRiskZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')}
//             {this.renderRiskZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')}

//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="My Location"
//             />

//             {destination && (
//               <Marker coordinate={destination} title="Destination" pinColor="blue" />
//             )}

//             {polylineCoordinates.length > 0 && (
//               <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
//             )}
//           </MapView>
//         ) : (
//           <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//         )}

//         <TabNavigator />
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
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CombinedMapScreen;

























// import React, { Component } from 'react';
// import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
// import MapboxService from '../Services/MapService';
// import TabNavigator from '../Components/TabNavigator'; // Ajout du TabNavigator

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';
// const config = { API_URL: 'http://your-api-url', port: 'your-port' };

// class CombinedMapScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null,
//       destination: null,
//       polylineCoordinates: [],
//       errorMessage: null,
//       safeZones: [],
//       mediumRiskZones: [],
//       highRiskZones: [],
//     };
//   }

//   async componentDidMount() {
//     try {
//       const location = await MapboxService.getLocation();
//       if (location) {
//         this.setState({ location });
//         // Fetch the risk zones after the location is retrieved
//         this.fetchRiskZones(location.coords.latitude, location.coords.longitude);
//       } else {
//         this.setState({ errorMessage: 'Failed to get location' });
//         Alert.alert('Error', 'Failed to get location. Please try again.');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: 'Error retrieving location' });
//       Alert.alert('Error', 'Error retrieving location.');
//     }
//   }

//   // Fetch risk zones from the backend
//   fetchRiskZones = async (latitude, longitude) => {
//     try {
//       const urlSafeZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/0?latitude=${latitude}&longitude=${longitude}`;
//       const urlMediumRiskZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/1?latitude=${latitude}&longitude=${longitude}`;
//       const urlHighRiskZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/2?latitude=${latitude}&longitude=${longitude}`;
  
//       // Log the URLs to debug
//       console.log('Safe Zones URL:', urlSafeZones);
//       console.log('Medium Risk Zones URL:', urlMediumRiskZones);
//       console.log('High Risk Zones URL:', urlHighRiskZones);
  
//       const [safeZonesResponse, mediumRiskZonesResponse, highRiskZonesResponse] = await Promise.all([
//         fetch(urlSafeZones),
//         fetch(urlMediumRiskZones),
//         fetch(urlHighRiskZones)
//       ]);
  
//       if (safeZonesResponse.ok && mediumRiskZonesResponse.ok && highRiskZonesResponse.ok) {
//         const safeZones = await safeZonesResponse.json();
//         const mediumRiskZones = await mediumRiskZonesResponse.json();
//         const highRiskZones = await highRiskZonesResponse.json();
  
//         this.setState({ safeZones, mediumRiskZones, highRiskZones });
//       } else {
//         Alert.alert('Error', 'Unable to fetch risk zones from the server');
//       }
//     } catch (error) {
//       console.error('Error fetching risk zones:', error);  // Log the error for debugging
//       Alert.alert('Error', `Error fetching risk zones: ${error.message}`);
//     }
//   };
  

//   handleMapPress = async (e) => {
//     const { location } = this.state;
//     const { latitude, longitude } = e.nativeEvent.coordinate;

//     this.setState({
//       destination: { latitude, longitude },
//       polylineCoordinates: [],
//     });

//     try {
//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const response = await fetch(directionsUrl);
//       const data = await response.json();

//       if (data.routes && data.routes.length > 0) {
//         const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
//           latitude: coord[1],
//           longitude: coord[0],
//         }));
//         this.setState({ polylineCoordinates: coordinates });
//       } else {
//         this.setState({ errorMessage: 'Failed to fetch route' });
//         Alert.alert('Error', 'Failed to fetch route.');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: 'Error fetching route' });
//       Alert.alert('Error', 'Error fetching route.');
//     }
//   };

//   renderRiskZones = (zones, color) =>
//     zones.map((zone) => (
//       <Circle
//         key={zone.id}
//         center={zone.center}
//         radius={1000}
//         strokeWidth={1}
//         strokeColor={color}
//         fillColor={`${color}50`}
//       />
//     ));

//   render() {
//     const { location, destination, polylineCoordinates, errorMessage, safeZones, mediumRiskZones, highRiskZones } = this.state;

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
//             onPress={this.handleMapPress}
//           >
//             {this.renderRiskZones(safeZones, 'rgba(0, 255, 0, 0.3)')}
//             {this.renderRiskZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')}
//             {this.renderRiskZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')}

//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="My Location"
//             />

//             {destination && (
//               <Marker coordinate={destination} title="Destination" pinColor="blue" />
//             )}

//             {polylineCoordinates.length > 0 && (
//               <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
//             )}
//           </MapView>
//         ) : (
//           <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//         )}

//         <TabNavigator />
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
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CombinedMapScreen;





// import React, { Component } from 'react';
// import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
// import MapboxService from '../Services/MapService';
// import TabNavigator from '../Components/TabNavigator';

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';
// const config = { API_URL: 'http://localhost', port: '3000' };

// class CombinedMapScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null,
//       destination: null,
//       polylineCoordinates: [],
//       errorMessage: null,
//       safeZones: [],
//       mediumRiskZones: [],
//       highRiskZones: [],
//     };
//   }

//   async componentDidMount() {
//     try {
//       const location = await MapboxService.getLocation();
//       if (location) {
//         this.setState({ location });
//         this.fetchRiskZones(location.coords.latitude, location.coords.longitude);
//       } else {
//         this.handleError('Failed to get location');
//       }
//     } catch (error) {
//       this.handleError('Error retrieving location');
//     }
//   }

//   fetchRiskZones = async (latitude, longitude) => {
//     try {
//       const urlSafeZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/0`;
//       const urlMediumRiskZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/1`;
//       const urlHighRiskZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/2`;

//       const body = JSON.stringify({
//         location: {
//           type: 'Point',
//           coordinates: [longitude, latitude],
//         },
//       });

//       const headers = {
//         'Content-Type': 'application/json',
//       };

//       const responses = await Promise.all([
//         fetch(urlSafeZones, { method: 'POST', headers, body }),
//         fetch(urlMediumRiskZones, { method: 'POST', headers, body }),
//         fetch(urlHighRiskZones, { method: 'POST', headers, body }),
//       ]);

//       const [safeZones, mediumRiskZones, highRiskZones] = await Promise.all(
//         responses.map((response) => {
//           if (response.ok) {
//             return response.json();
//           } else {
//             throw new Error(`Request failed: ${response.status}`);
//           }
//         })
//       );

//       this.setState({ safeZones, mediumRiskZones, highRiskZones });
//     } catch (error) {
//       this.handleError(`Error fetching risk zones: ${error.message}`);
//     }
//   };

//   handleError = (message) => {
//     this.setState({ errorMessage: message });
//     Alert.alert('Error', message);
//   };

//   handleMapPress = async (e) => {
//     const { location } = this.state;
//     const { latitude, longitude } = e.nativeEvent.coordinate;

//     this.setState({
//       destination: { latitude, longitude },
//       polylineCoordinates: [],
//     });

//     try {
//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const response = await fetch(directionsUrl);
//       const data = await response.json();

//       if (data.routes && data.routes.length > 0) {
//         const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
//           latitude: coord[1],
//           longitude: coord[0],
//         }));
//         this.setState({ polylineCoordinates: coordinates });
//       } else {
//         this.handleError('Failed to fetch route');
//       }
//     } catch (error) {
//       this.handleError('Error fetching route');
//     }
//   };

//   renderRiskZones = (zones, color) =>
//     zones.map((zone, index) => (
//       <Circle
//         key={index}
//         center={{
//           latitude: zone.location.coordinates[1],
//           longitude: zone.location.coordinates[0],
//         }}
//         radius={1000}
//         strokeWidth={1}
//         strokeColor={color}
//         fillColor={`${color}50`}
//       />
//     ));

//   render() {
//     const { location, destination, polylineCoordinates, safeZones, mediumRiskZones, highRiskZones } = this.state;

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
//             onPress={this.handleMapPress}
//           >
//             {this.renderRiskZones(safeZones, 'rgba(0, 255, 0, 0.3)')}
//             {this.renderRiskZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')}
//             {this.renderRiskZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')}

//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="My Location"
//             />

//             {destination && (
//               <Marker coordinate={destination} title="Destination" pinColor="blue" />
//             )}

//             {polylineCoordinates.length > 0 && (
//               <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
//             )}
//           </MapView>
//         ) : (
//           <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//         )}

//         <TabNavigator />
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
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CombinedMapScreen;
 







































// import React, { Component } from 'react';
// import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
// import MapboxService from '../Services/MapService';
// import TabNavigator from '../Components/TabNavigator'; 

// const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';

// class CombinedMapScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       location: null,
//       destination: null,
//       polylineCoordinates: [],
//       errorMessage: null,
//       safeZones: [],
//       mediumRiskZones: [],
//       highRiskZones: [],
//     };
//   }

//   async componentDidMount() {
//     try {
//       const location = await MapboxService.getLocation();
//       if (location) {
//         this.setState({ location });
//         await this.fetchRiskZones(location.coords.latitude, location.coords.longitude);
//       } else {
//         this.setState({ errorMessage: 'Failed to get location' });
//         Alert.alert('Error', 'Failed to get location. Please try again.');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: 'Error retrieving location' });
//       Alert.alert('Error', 'Error retrieving location.');
//     }
//   }

//   fetchRiskZones = async (latitude, longitude) => {
//     try {
//       const urlSafeZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/0`;
//       const urlMediumRiskZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/1`;
//       const urlHighRiskZones = `${config.API_URL}:${config.port}/signalements/high-risk-nearby/2`;

//       const data = {
//         location: {
//           type: 'Point',
//           coordinates: [longitude, latitude],
//         },
//       };

//       // Fetch Safe Zones
//       const responseSafe = await fetch(urlSafeZones, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const safeZones = await responseSafe.json();

//       // Fetch Medium Risk Zones
//       const responseMedium = await fetch(urlMediumRiskZones, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const mediumRiskZones = await responseMedium.json();

//       // Fetch High Risk Zones
//       const responseHigh = await fetch(urlHighRiskZones, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//       });
//       const highRiskZones = await responseHigh.json();

//       // Update the state with the fetched zones
//       this.setState({
//         safeZones,
//         mediumRiskZones,
//         highRiskZones,
//       });
//     } catch (error) {
//       this.setState({ errorMessage: 'Error fetching risk zones' });
//       Alert.alert('Error', 'Error fetching risk zones.');
//     }
//   };

//   handleMapPress = async (e) => {
//     const { location } = this.state;
//     const { latitude, longitude } = e.nativeEvent.coordinate;

//     this.setState({
//       destination: { latitude, longitude },
//       polylineCoordinates: [],
//     });

//     try {
//       const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
//       const response = await fetch(directionsUrl);
//       const data = await response.json();

//       if (data.routes && data.routes.length > 0) {
//         const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
//           latitude: coord[1],
//           longitude: coord[0],
//         }));
//         this.setState({ polylineCoordinates: coordinates });
//       } else {
//         this.setState({ errorMessage: 'Failed to fetch route' });
//         Alert.alert('Error', 'Failed to fetch route.');
//       }
//     } catch (error) {
//       this.setState({ errorMessage: 'Error fetching route' });
//       Alert.alert('Error', 'Error fetching route.');
//     }
//   };

//   renderRiskZones = (zones, color) =>
//     zones.map((zone) => (
//       <Circle
//         key={zone.id}
//         center={zone.center}
//         radius={1000}
//         strokeWidth={1}
//         strokeColor={color}
//         fillColor={`${color}50`}
//       />
//     ));

//   render() {
//     const { location, destination, polylineCoordinates, safeZones, mediumRiskZones, highRiskZones, errorMessage } = this.state;

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
//             onPress={this.handleMapPress}
//           >
//             {this.renderRiskZones(safeZones, 'rgba(0, 255, 0, 0.3)')}
//             {this.renderRiskZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')}
//             {this.renderRiskZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')}

//             <Marker
//               coordinate={{
//                 latitude: location.coords.latitude,
//                 longitude: location.coords.longitude,
//               }}
//               title="My Location"
//             />

//             {destination && (
//               <Marker coordinate={destination} title="Destination" pinColor="blue" />
//             )}

//             {polylineCoordinates.length > 0 && (
//               <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
//             )}
//           </MapView>
//         ) : (
//           <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
//         )}

//         <TabNavigator />
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
//   loader: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default CombinedMapScreen;

















import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker, Circle, Polyline } from 'react-native-maps';
import TabNavigator from '../Components/TabNavigator';
import MapboxService from '../Services/MapService';
import config from '../config'; // Make sure this path is correct

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidXNlcmF5YTE3IiwiYSI6ImNtNHBzZ240eTB0YmIybXNuN3czZHo4enYifQ.cKG7v7KZOEFIPnzWVXIVCw';
const BASE_URL = `${config.API_URL}:${config.port}/signalements`;

class CombinedMapScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      destination: null,
      polylineCoordinates: [],
      safeZones: [],
      mediumRiskZones: [],
      highRiskZones: [],
      errorMessage: null,
    };
  }

  async componentDidMount() {
    try {
      const location = await this.getLocation();
      if (location) {
        this.setState({ location });
        await this.fetchRiskZones(location.coords.latitude, location.coords.longitude);
      } else {
        this.handleError('Impossible de récupérer la localisation');
      }
    } catch (error) {
      this.handleError('Erreur lors de la récupération de la localisation');
    }
  }

  // Obtenir la localisation de l'utilisateur
  getLocation = async () => {
    try {
      return await MapboxService.getLocation();
    } catch (error) {
      console.error('Erreur lors de la récupération de la localisation:', error);
      return null;
    }
  };

  // Récupérer les zones de risque
  fetchRiskZones = async (latitude, longitude) => {
    try {
      const thresholds = [0, 1, 2]; // Safe, Medium, High
      const riskZones = await Promise.all(
        thresholds.map((threshold) =>
          fetch(`${BASE_URL}/high-risk-nearby/${threshold}/${latitude}/${longitude}`).then((res) =>
            res.json()
          )
        )
      );

      this.setState({
        safeZones: riskZones[0] || [],
        mediumRiskZones: riskZones[1] || [],
        highRiskZones: riskZones[2] || [],
      });
    } catch (error) {
      this.handleError('Erreur lors de la récupération des zones de risque');
    }
  };

  // Gérer les erreurs globales
  handleError = (message) => {
    this.setState({ errorMessage: message });
    Alert.alert('Erreur', message);
  };

  handleMapPress = async (e) => {
    const { location } = this.state;
    const { latitude, longitude } = e.nativeEvent.coordinate;

    this.setState({
      destination: { latitude, longitude },
      polylineCoordinates: [],
    });

    try {
      const directionsUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${location.coords.longitude},${location.coords.latitude};${longitude},${latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
      const response = await fetch(directionsUrl);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map((coord) => ({
          latitude: coord[1],
          longitude: coord[0],
        }));
        this.setState({ polylineCoordinates: coordinates });
      } else {
        this.handleError('Impossible de récupérer l’itinéraire');
      }
    } catch (error) {
      this.handleError('Erreur lors de la récupération de l’itinéraire');
    }
  };

  // Rendu des zones de risque
  renderRiskZones = (zones, color) =>
    zones.map((zone) => {
      const { center } = zone;
      if (center && center.coordinates && Array.isArray(center.coordinates)) {
        const [longitude, latitude] = center.coordinates;
        return (
          <Circle
            key={zone.id}
            center={{ latitude, longitude }}
            radius={1000}
            strokeWidth={1}
            strokeColor={color}
            fillColor={`${color}50`}
          />
        );
      } else {
        console.error('Coordonnées de zone invalides:', zone);
        return null;
      }
    });

  render() {
    const { location, destination, polylineCoordinates, safeZones, mediumRiskZones, highRiskZones } =
      this.state;

    return (
      <View style={styles.container}>
        {location ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            onPress={this.handleMapPress}
          >
            {this.renderRiskZones(safeZones, 'rgba(0, 255, 0, 0.3)')}
            {this.renderRiskZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')}
            {this.renderRiskZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')}

            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Ma localisation"
            />

            {destination && (
              <Marker coordinate={destination} title="Destination" pinColor="blue" />
            )}

            {polylineCoordinates.length > 0 && (
              <Polyline coordinates={polylineCoordinates} strokeWidth={4} strokeColor="blue" />
            )}
          </MapView>
        ) : (
          <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />
        )}

        <TabNavigator />
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CombinedMapScreen;
