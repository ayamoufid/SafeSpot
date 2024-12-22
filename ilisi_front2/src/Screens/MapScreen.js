import React from 'react';
import { View, StyleSheet } from 'react-native';
import MyMapboxViewer from '../Components/MyMapboxViewer'; // Import MyMapboxViewer component
import TabNavigator from '../Components/TabNavigator';

const MapScreen = ({navigation}) => {
  return (
    <View style={{flex:1,width:100}}>
      <MyMapboxViewer />
      <TabNavigator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});



export default MapScreen;
