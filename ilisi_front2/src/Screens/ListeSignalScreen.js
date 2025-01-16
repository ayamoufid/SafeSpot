import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import TabNavigator from '../Components/TabNavigator'; // Ajout du TabNavigator
import config from '../config'; // Make sure this path is correct
import { useFocusEffect } from '@react-navigation/native'; // Importer useFocusEffect
import { useSelector } from 'react-redux';

// Fonction pour récupérer les signaux depuis le backend
const fetchSignals = async (userId) => {
  try {
    const url = `${config.API_URL}:${config.port}/signalements/user/${userId}`;
    const response = await fetch(url); // Modifiez l'URL et l'ID selon vos besoins
    if (response.ok) {
      const data = await response.json();
      return data; // Retourne les signaux récupérés
    } else {
      const errorText = await response.text();
      Alert.alert('Erreur', `Impossible de récupérer les signalements : ${errorText}`);
    }
  } catch (error) {
    Alert.alert('Erreur', `Erreur réseau : ${error.message}`);
  }
};

const getTypeColor = (type) => {
  switch (type) {
    case 'Embouteillage':
      return '#4169E1'; // Royal Blue
    case 'Accident':
      return '#1E90FF'; // Dodger Blue
    case 'Crime':
      return '#00BFFF'; // Deep Sky Blue
    default:
      return '#87CEEB'; // Sky Blue
  }
};

const SignalListScreen = () => {
  const [signals, setSignals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Utilisation de useSelector pour récupérer userId
  const userId = useSelector((state) => state.auth.userId);

  // Utilisation de useFocusEffect pour actualiser les signaux chaque fois que l'écran est actif
  useFocusEffect(
    React.useCallback(() => {
      const loadSignals = async () => {
        setLoading(true);
        const backendSignals = await fetchSignals(userId); // Passer userId à fetchSignals
        setSignals(backendSignals);
        setLoading(false);
      };
      loadSignals();
    }, [userId]) // Ajout de userId dans le tableau de dépendances
  );

  const renderSignal = ({ item }) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemContent}>
        <Text style={[styles.title, { color: getTypeColor(item.type) }]}>{item.type}</Text>
        <Text style={styles.subtitle}>{item.description}</Text>
        <Text style={styles.subtitle}>{item.zone.city}</Text>
        <Text style={styles.date}>{new Date(item.date).toLocaleString()}</Text>
      </View>
      <TouchableOpacity
        style={[styles.button, { borderColor: getTypeColor(item.type) }]}
        onPress={() => setSelectedLocation(item.location.coordinates)} // Changer la position sélectionnée
      >
        <Text style={[styles.buttonText, { color: getTypeColor(item.type) }]}>Voir position</Text>
      </TouchableOpacity>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={signals}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderSignal}
      />

      {/* Afficher la carte si une position est sélectionnée */}
      {selectedLocation && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: selectedLocation[1],
            longitude: selectedLocation[0],
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={{ latitude: selectedLocation[1], longitude: selectedLocation[0] }} />
        </MapView>
      )}
      <TabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  listItemContent: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
  },
  button: {
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  map: {
    height: 300, // Taille de la carte
    marginTop: 20,
  },
});

export default SignalListScreen;
