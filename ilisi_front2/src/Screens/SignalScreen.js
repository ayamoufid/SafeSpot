import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { Button, Card, Title, Paragraph, TextInput } from 'react-native-paper';

const SignalScreen = () => {
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    if (selectedType) {
      console.log({ type: selectedType, description: description || "Aucune description fournie" });
      // Handle form submission here
    }
  };

  const reportTypes = [
    { id: '1', label: 'Crime' },
    { id: '2', label: 'Embouteillage' },
    { id: '3', label: 'Vol' },
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
