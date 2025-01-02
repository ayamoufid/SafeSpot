import React, { useState,useEffect } from 'react';


import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import config from '../config'; // Make sure this path is correct
import styles from '../Components/Styles';

import { useDispatch,useSelector } from 'react-redux'; // Importer useDispatch
import { login } from '../Redux/Actions/authActions'; // Importer l'action login



export default function LoginScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //////
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn, error } = useSelector((state) => state.auth);
  useEffect(() => {
  if (isLoggedIn) {
  navigation.navigate('Map');
  }
  }, [isLoggedIn, navigation]); // Ajoutez la dépendance à 'isLoggedIn'
  /////


  const handleLogin = async () => {
    
    if (!username || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }
    
    try {
      const response = await fetch('http://192.168.0.104:3000/authent/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        //dispatch(login()); // Déclencher l'action login dans Redux
        dispatch(login(username, password));
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
      {/*<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="chevron-left" size={24} color="#000" />
      </TouchableOpacity>*/}
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