import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TabNavigator from '../Components/TabNavigator';

const ProfileScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Ajouter votre logique de déconnexion ici
    console.log('Logged out');
    navigation.navigate('Login'); // Exemple : rediriger vers l'écran de connexion
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.container}>
          {/* Top curved section */}
          <View style={styles.header}>
            <View style={styles.headerCurve} />
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>

          {/* Profile content */}
          <View style={styles.content}>
            {/* Avatar and Username */}
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={styles.avatar}
              />
              <Text style={styles.username}>@johnsmith</Text>
            </View>

            {/* Name and Location */}
            <Text style={styles.name}>John Smith</Text>
            <Text style={styles.location}>New York</Text>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Nombre de signalements</Text>
                <Text style={styles.infoValue}>0</Text>
              </View>

              <TouchableOpacity 
                style={styles.modifyProfileButton}
                onPress={() => navigation.navigate('ModifierProfile')}
              >
                <Text style={styles.modifyProfileButtonText}>Modifier profile</Text>
              </TouchableOpacity>
            </View>

            {/* About Section */}
            <View style={styles.aboutSection}>
              <Text style={styles.aboutTitle}>About me:</Text>
              <Text style={styles.aboutText}>
                Lorem ipsum dolor sit amet, vis no erroribus hendrerit consequat, 
                has ne particula argumentum, usu audire dolorem ne.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      {/* TabNavigator */}
      <View style={styles.tabNavigator}>
        <TabNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    height: 250,
    backgroundColor: '#3b82f6',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    position: 'relative',
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
  logoutButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  content: {
    marginTop: -100,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  username: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  location: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 300,
  },
  infoBox: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  modifyProfileButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '100%',
  },
  modifyProfileButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  aboutSection: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  tabNavigator: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

export default ProfileScreen;
