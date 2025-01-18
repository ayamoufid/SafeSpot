import { TouchableOpacity, View , Text} from 'react-native';
import React from "react";
import styles from "../Components/Styles.js";


export class Sandbox extends React.Component {
    // Constructor with props
    constructor(props) {
    super(props); // This ensures you can access this.props
    }
    handleLogin= () => {
    // Check that navigation is properly passed down
    console.log(this.props.navigation);
    this.props.navigation.navigate('Login'); // Navigate to the Login screen
    };
    handleRegister = () => {
    this.props.navigation.navigate('Register'); // Navigate to the Register screen
    };
    render() {
    return (
        <View style={styles.sandboxSection}>
        <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.textButton}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.buttonRegister]} onPress={this.handleRegister}>
            <Text style={styles.textButton}>Register</Text>
        </TouchableOpacity>
    </View>
    )}}
    