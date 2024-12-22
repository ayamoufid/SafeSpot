import { ImageBackground , View , Text, Image} from "react-native";
import styles from "../Components/Styles.js";
import React from "react";

export default class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <ImageBackground style={styles.container}>
                 <View style={styles.headerSection}>
                <Image style={styles.icon} source={require('../../assets/favicon.png')} />
                <Text style={styles.title}>Monitoring App</Text>
            </View>
            </ImageBackground>
        );
    }
}