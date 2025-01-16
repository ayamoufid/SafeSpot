import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import config from '../config'; // Make sure this path is correct
import styles from '../Components/Styles';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');  const [phoneNumber, setPhoneNumber] = useState('');

  const handleRegister = async () => {
    if (!username || !password || !firstName || !lastName || !email || !phoneNumber) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    try {
      const url = `${config.API_URL}:${config.port}/authent/register`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, firstName, lastName, email, phoneNumber }),
      });

      if (response.ok) {
        Alert.alert('Success', 'User registered successfully');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to register user');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Icon name="shield" size={24} color="#fff" />
        </View>
        <Text style={styles.title}>Create Account</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
            autoCapitalize="words"
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
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
          <TouchableOpacity style={styles.signupButton} onPress={handleRegister}>
            <Text style={styles.signupButtonText}>SIGN UP</Text>
          </TouchableOpacity>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}