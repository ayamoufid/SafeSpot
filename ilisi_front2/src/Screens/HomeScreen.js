import { View } from 'react-native';
import Header from '../Components/Header';
import { Sandbox } from '../Components/Sandbox';
import React from "react";


export default class HomeScreen extends React.Component {
  render(){
  return(
  <View style={{flex:1}}>
  <Header/>
  <Sandbox navigation={this.props.navigation} />
  </View>
  );}
  }