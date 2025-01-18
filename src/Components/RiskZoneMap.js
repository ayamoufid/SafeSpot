import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Circle } from 'react-native-maps';

const RiskZoneMap = () => {
  const safeZones = [
    {
      id: 1,
      city: 'Casablanca',
      center: { latitude: 33.5428, longitude: -7.6436 },
      riskLevel: 0,
    },
    {
      id: 2,
      city: 'Mohammédia المحمدية',
      center: { latitude: 33.6835, longitude: -7.3828 },
      riskLevel: 0,
    },
  ];

  const mediumRiskZones = [
    {
      id: 3,
      city: 'Casablanca ⵜⴰⴷⴷⴰⵔⵜ ⵜⵓⵎⵍⵉⵍⵜ الدار البيضاء',
      center: { latitude: 33.6228, longitude: -7.4936 },
      riskLevel: 2,
    },
  ];

  const highRiskZones = [
    {
      id: 4,
      city: 'El Mansouria ⵎⵏⵚⵓⵕⵢⵢⴰ المنصورية',
      center: { latitude: 33.7088, longitude: -7.3163 },
      riskLevel: 3,
    },
  ];

  const renderZones = (zones, color) =>
    zones.map((zone) => (
      <Circle
        key={`zone-${zone.id}`}
        center={zone.center}
        radius={1000} // Rayon en mètres
        strokeWidth={1} // Bordure du cercle
        strokeColor={color} // Couleur de la bordure
        fillColor={`${color}50`} // Couleur de remplissage avec transparence
      />
    ));

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 33.6228,
          longitude: -7.4936,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {/* Zones sûres */}
        {renderZones(safeZones, 'rgba(0, 255, 0, 0.3)')} {/* Vert transparent */}

        {/* Zones moyennement risquées */}
        {renderZones(mediumRiskZones, 'rgba(255, 165, 0, 0.3)')} {/* Orange transparent */}

        {/* Zones à haut risque */}
        {renderZones(highRiskZones, 'rgba(255, 0, 0, 0.3)')} {/* Rouge transparent */}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default RiskZoneMap;
