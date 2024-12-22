import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, TextInput, Button, Alert } from "react-native";
import styles from "../Components/Styles";
import MapScreen from "../Screens/MapScreen";
import SettingScreen from "../Screens/SettingScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator(); // Création d’une instance du Tab.Navigator

const TabNavigator = () => {
  return (
    /* Définir les écrans dans le Tab.Navigator */
    <Tab.Navigator
      initialRouteName="Profile"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle, // Tab Bar Styling
        tabBarActiveTintColor: "#e91e63", // Active icon color
        tabBarInactiveTintColor: "#8e8e8e", // Inactive icon color
        tabBarLabelStyle: styles.tabBarLabelStyle, // Label styling
        tabBarIconStyle: styles.tabBarIconStyle, // Icon styling
      }}
    >
      {/* Utilisez le Tab.Screen pour chaque onglet que vous souhaitez ajouter. */}
     {/* prbleme de cycle de affichage dans map */}
      {/* <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="Map" 
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Map",
        }}
      /> */}

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account" // Icône de profil utilisateur
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Profile",
          tabBarBadge: 5, // Affiche un badge avec le chiffre 5
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="cog" // Icône pour "Settings"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
