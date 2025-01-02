import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';

const ModifierProfileScreen = () => {
  const [name, setName] = useState('John Smith');
  const [password, setPassword] = useState('');
  const [aboutMe, setAboutMe] = useState('Lorem ipsum dolor sit amet, vis no erroribus hendrerit consequat, has ne particula argumentum, usu audire dolorem ne.');

  return (
    <ScrollView style={styles.container}>
      {/* Top curved section */}
      <View style={styles.header}>
        <View style={styles.headerCurve} />
      </View>

      {/* Profile content */}
      <View style={styles.content}>
        {/* Avatar */}
        <View style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={styles.avatar}
          />
          <TouchableOpacity style={styles.changeImageButton}>
            <Text style={styles.changeImageButtonText}>Modifier l'image</Text>
          </TouchableOpacity>
        </View>

        {/* Form fields */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Entrez votre nom"
          />

          <Text style={styles.label}>Nouveau mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Entrez votre nouveau mot de passe"
            secureTextEntry
          />

          <Text style={styles.label}>Confirmer mot de passe</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Entrez votre nouveau mot de passe"
            secureTextEntry
          />


          <Text style={styles.label}>About me</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={aboutMe}
            onChangeText={setAboutMe}
            placeholder="Parlez-nous de vous"
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 200,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerCurve: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  content: {
    marginTop: -100,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: 'white',
    marginBottom: 10,
  },
  changeImageButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  changeImageButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ModifierProfileScreen;

