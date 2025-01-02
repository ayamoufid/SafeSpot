import React from 'react';
import { View, StyleSheet, SafeAreaView, Text } from 'react-native';
import MyMapboxViewer from '../Components/MyMapboxViewer';
import TabNavigator from '../Components/TabNavigator';
import SearchBar from '../Components/SearchBar';
import LoginScreen from './LoginScreen';

import { useSelector } from 'react-redux'; // Importer useSelector

const MapScreen = ({ navigation }) => {
    const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);
    console.log(isLoggedIn);
    // Redirect to login screen if not logged in
    if (!isLoggedIn) {
    // You can use navigation to redirect to the login screen
    navigation.navigate('Login');
    }
  return (  
    <SafeAreaView style={styles.container}>
      {/* <SearchBar /> */}
      <View style={styles.mapContainer}>
        {isLoggedIn ? (
        <MyMapboxViewer />
        ) : (
        <View style={styles.centered}>
          <Text>You are not logged in. Please log in to continue.</Text>
            {/* You can redirect the user to the login page if needed */}
          </View>
      )}
      </View>
      <TabNavigator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
  },
});

export default MapScreen;