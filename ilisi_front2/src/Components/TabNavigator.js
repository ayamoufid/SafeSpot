import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Bell, Plus, User } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const TabNavigator = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.tabButton}
        onPress={() => navigation.navigate('Map')}
      >
        <Home width={24} height={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tabButton}
        onPress={() => navigation.navigate('ListeSignal')}
      >
        <View style={styles.documentIcon}>
          {/* Document icon */}
        </View>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.plusButton}
        onPress={() => navigation.navigate('Signal')}
      >
        <Plus width={24} height={24} color="#fff" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tabButton}
        onPress={() => navigation.navigate('Notifications')}
      >
        <Bell width={24} height={24} color="#000" />
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.tabButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <User width={24} height={24} color="#000" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e5e5',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabButton: {
    padding: 8,
  },
  plusButton: {
    backgroundColor: '#0066FF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  documentIcon: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 2,
  },
});

export default TabNavigator;

