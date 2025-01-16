import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import config from '../config'; // Assurez-vous que ce chemin est correct
import styles from '../Components/Styles';

import { useDispatch, useSelector } from 'react-redux'; // Importer useDispatch
import { login } from '../Redux/Actions/authActions'; // Importer l'action login

export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigation.navigate('Map');
    }
  }, [isLoggedIn, navigation]); // Dépendance à 'isLoggedIn'

  // Fonction pour récupérer l'ID d'un utilisateur par son username
  const getIdByUsername = async (username) => {
    try {
      const url = `${config.API_URL}:${config.port}/authent/get-id?username=${username}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        return data.id; // Retourne l'ID de l'utilisateur
      } else {
        console.error(`Failed to fetch ID for username: ${username}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching ID:', error);
      return null;
    }
  };

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      const url = `${config.API_URL}:${config.port}/authent/login`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        dispatch(login(username, password));

        // Récupérer l'ID et l'afficher dans le terminal
        const userId = await getIdByUsername(username);
        if (userId) {
          // console.log(`User ID for ${username}:`, userId);
        } else {
          console.log(`Unable to fetch ID for username: ${username}`);
        }

        Alert.alert('Success', 'User logged in successfully');
        navigation.navigate('Map');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to log in user');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shield" size={24} color="#fff" />
        </View>
        <Text style={styles.title}>Welcome back.</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>LOGIN</Text>
          </TouchableOpacity>
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
