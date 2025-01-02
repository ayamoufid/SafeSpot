import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../Components/Styles';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shield" size={40} color="#fff" />
        </View>
        <Text style={styles.title}>SafeSpot</Text>
        <Text style={styles.subtitle}>
          The easiest way to start with your amazing application.
        </Text>
        <View style={styles.buttonContainer1}>
          <TouchableOpacity
            style={styles.loginButton1}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginButtonText1}>LOGIN</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signupButton1}
            onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.signupButtonText1}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}