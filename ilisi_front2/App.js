import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './src/Screens/LoginScreen';
import RegisterScreen from './src/Screens/RegisterScreen';
import HomeScreen from './src/Screens/HomeScreen';
import MapScreen from './src/Screens/MapScreen';
import SignalScreen from './src/Screens/SignalScreen';
// import NotificationsScreen from './src/Screens/NotificationsScreen';
import ProfileScreen from './src/Screens/ProfileScreen';
import ModifierProfileScreen from './src/Screens/ModifierProfileScreen'; // Import the new screen

import { Provider } from "react-redux";
import store from './src/Redux/Store/Store';  

export default function App() {
  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="Signal" component={SignalScreen} />
        {/* <Stack.Screen name="Notifications" component={NotificationsScreen} /> */}
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="ModifierProfile" component={ModifierProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

