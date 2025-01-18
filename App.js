import React, { Suspense, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from "react-redux";
import store from './src/Redux/Store/Store';

import messaging from '@react-native-firebase/messaging';

// Lazy loading des écrans
const LoginScreen = React.lazy(() => import('./src/Screens/LoginScreen'));
const RegisterScreen = React.lazy(() => import('./src/Screens/RegisterScreen'));
const MapScreen = React.lazy(() => import('./src/Screens/MapScreen'));
const SignalScreen = React.lazy(() => import('./src/Screens/SignalScreen'));
const ProfileScreen = React.lazy(() => import('./src/Screens/ProfileScreen'));
const ModifierProfileScreen = React.lazy(() => import('./src/Screens/ModifierProfileScreen'));
const HomeScreen = React.lazy(() => import('./src/Screens/HomeScreen'));
const ListeSignalScreen = React.lazy(() => import('./src/Screens/ListeSignalScreen'));



export default function App() {
  const Stack = createStackNavigator();

  // Demander la permission pour les notifications
  const requestUserPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled = 
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        console.log('Permission accordée :', authStatus);
        getToken(); // Appel pour obtenir le token une fois la permission accordée
      } else {
        console.log('Permission refusée pour les notifications');
      }
    } catch (error) {
      console.log('Erreur lors de la demande de permission:', error);
    }
  };

  // Obtenir le token de l'utilisateur
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log("Token Firebase:", token); // Affiche le token dans la console
    } catch (error) {
      console.log("Erreur lors de la récupération du token:", error);
    }
  };

  useEffect(() => {
    requestUserPermission(); // Demander la permission dès le démarrage
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={LazyComponent(HomeScreen)} />
          <Stack.Screen name="Register" component={LazyComponent(RegisterScreen)} />
          <Stack.Screen name="Login" component={LazyComponent(LoginScreen)} />
          <Stack.Screen name="Map" component={LazyComponent(MapScreen)} />
          <Stack.Screen name="Signal" component={LazyComponent(SignalScreen)} />
          <Stack.Screen name="Profile" component={LazyComponent(ProfileScreen)} />
          <Stack.Screen name="ModifierProfile" component={LazyComponent(ModifierProfileScreen)} />
          <Stack.Screen name="ListeSignal" component={LazyComponent(ListeSignalScreen)} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// Wrapper pour les composants avec React.lazy
function LazyComponent(Component) {
  return (props) => (
    <Suspense
      fallback={
        <View style={styles.screenContainer}>
          <Text>Chargement...</Text>
        </View>
      }
    >
      <Component {...props} />
    </Suspense>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
