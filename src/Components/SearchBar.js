import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MapPin } from 'lucide-react-native';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <MapPin style={styles.icon} width={20} height={20} color="#666" />
        <TextInput
          style={styles.input}
          placeholder="Search Location"
          placeholderTextColor="#666"
          editable={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});

export default SearchBar;

