import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';
import MapboxService from '../Services/MapService'; // Importation du service
import config from '../config'; // Make sure this path is correct
import { useSelector } from 'react-redux'; // Import useSelector from redux

const SignalScreen = () => {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState(null);

  // Utilisation de Redux pour obtenir l'ID de l'utilisateur
  const userId = useSelector((state) => state.auth.userId); // Assuming userId is stored under auth in the Redux store

  // Récupérer la localisation de l'utilisateur
  useEffect(() => {
    (async () => {
      const userLocation = await MapboxService.getLocation();
      if (userLocation) {
        setLocation({
          type: 'Point',
          coordinates: [userLocation.coords.longitude, userLocation.coords.latitude],
        });
      } else {
        Alert.alert('Erreur', 'Impossible de récupérer la localisation.');
      }
    })();
  }, []);

  const handleSubmit = async () => {
    if (!selectedType) {
      Alert.alert('Erreur', 'Veuillez sélectionner un type de signalement.');
      return;
    }

    if (!location) {
      Alert.alert('Erreur', 'Localisation non disponible.');
      return;
    }

    const data = {
      type: selectedType,
      description: description || 'Aucune description fournie',
      location: location,
      userId: userId, // Using the dynamic userId from Redux store
    };

    try {
      const url = `${config.API_URL}:${config.port}/signalements`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        Alert.alert('Succès', 'Votre signalement a été envoyé.');
        setSelectedType('');
        setDescription('');
      } else {
        Alert.alert('Erreur', 'Une erreur est survenue lors de l\'envoi.');
        console.error(await response.text());
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de contacter le serveur.');
      console.error(error);
    }
  };

  const reportTypes = [
    { id: 'Crime', label: 'Crime' },
    { id: 'Embouteillage', label: 'Embouteillage' },
    { id: 'Vol', label: 'Vol' },
    { id: 'Accident', label: 'Accident' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>Signalement</Title>
          
          <Paragraph style={styles.label}>Type de signalement</Paragraph>
          {reportTypes.map((type) => (
            <TouchableOpacity
              key={type.id}
              style={[ 
                styles.typeOption,
                selectedType === type.id && styles.selectedTypeOption,
              ]}
              onPress={() => setSelectedType(type.id)}
            >
              <Text
                style={[
                  styles.typeLabel,
                  selectedType === type.id && styles.selectedTypeLabel,
                ]}
              >
                {type.label}
              </Text>
            </TouchableOpacity>
          ))}

          <TextInput
            label="Description (facultatif)"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={6} // Augmente la hauteur de la zone de texte
            style={styles.textInput}
          />

          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={!selectedType}
            style={styles.submitButton}
          >
            Envoyer
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#2196F3',
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  typeOption: {
    backgroundColor: '#E3F2FD',
    marginBottom: 8,
    borderRadius: 4,
    padding: 12,
    justifyContent: 'center',
  },
  selectedTypeOption: {
    backgroundColor: '#1976D2',
  },
  typeLabel: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  selectedTypeLabel: {
    color: '#FFF',
  },
  textInput: {
    backgroundColor: 'white',
    marginTop: 16,
    marginBottom: 16,
    height: 120,
  },  
  submitButton: {
    marginTop: 16,
    backgroundColor: '#1976D2',
  },
});

export default SignalScreen;
