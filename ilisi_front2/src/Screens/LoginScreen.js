import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import Header from '../Components/Header';
import React from "react";
//import axios from "axios";
import styles from '../Components/Styles';
import config from '../config';

export default class LoginScreen extends React.Component {

  constructor(props) {
    super(props);
    // Initialisation de l'état local
    this.state = {
        username: '',
        password: '',
    };
}

handleLogin = async () => {
  const { username, password } = this.state;

  if (!username || !password) {
    Alert.alert('Error', 'Please fill all fields');
    return;
  }

  try {
    const response = await fetch(config.API_URL+':'+config.port+'/authent/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      Alert.alert('Success', 'User log in successfully');
      this.props.navigation.navigate('Map');
    } else {
      const errorData = await response.json();
      Alert.alert('Error', errorData.message || 'Failed to log in user');
    }
  } catch (error) {
    Alert.alert('Error', 'Network error');
  }
};


  render() {
  const { username, password } = this.state;
  return (
    <View style={styles.mainContainer}>
      <View style={styles.formContainer}>
        {/* Username Input */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => this.setState({ username: text })}
        />
        {/* Password Input */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={(text) => this.setState({ password: text })}
        />
        {/* Login Button */}
        <View style={styles.buttonContainer}>
          <Button title="Login" onPress={this.handleLogin} />
        </View>
      </View>
    </View>
  );}}