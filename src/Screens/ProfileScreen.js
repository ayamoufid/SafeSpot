import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import TabNavigator from '../Components/TabNavigator';
import config from '../config';

export const LOGIN_FAILURE = 'LOGIN_FAILURE';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { isLoading, userId } = useSelector((state) => state.auth);

  const [userData, setUserData] = useState(null);
  const [signalCount, setSignalCount] = useState(0);

  const url = `${config.API_URL}:${config.port}`;

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfoResponse = await fetch(`${url}/authent/get-user-info?id=${userId}`);
        const userInfo = await userInfoResponse.json();
        setUserData(userInfo);

        const signalCountResponse = await fetch(`${url}/signalements/users/signal-count/${userId}`);
        const signalCountData = await signalCountResponse.json();
        //console.log("////////////////////////////////////",signalCountData);
        setSignalCount(signalCountData || 0);
    
      } catch (err) {
        console.error('Error fetching user data:', err);
      }
    };

    fetchUserInfo();
  }, [userId, url]);

  const handleLogout = () => {
    console.log('Logged out');
    dispatch({
      type: LOGIN_FAILURE,
      payload: 'An error occurred during login',
    });
    navigation.navigate('Login');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.profileContainer}>
          <Image
            source={{
              uri: 'https://i0.wp.com/bedfordcollegegroup.ac.uk/uploads/sites/2/2021/09/Safe-Place-Scheme.png?fit=1378%2C1457&ssl=1',
            }}
            style={styles.avatar}
          />
          <Text style={styles.username}>@{userData?.username}</Text>
          <Text style={styles.name}>{userData?.prenom} {userData?.nom}</Text>
          <Text style={styles.infoText}>{userData?.email}</Text>
          <Text style={styles.infoText}>{userData?.numeroTelephone}</Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{signalCount}</Text>
            <Text style={styles.statLabel}>Signalements</Text>
          </View>
        </View>

        <View style={styles.aboutSection}>
          <Text style={styles.aboutTitle}>À propos de l'app :</Text>
          <Text style={styles.aboutText}>
            Safespot app for solving safe places.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.tabNavigator}>
        <TabNavigator />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#f0f8ff',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    height: 200,
    backgroundColor: '#3b82f6',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingBottom: 20,
    paddingRight: 20,
  },
  logoutButton: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -50,
    paddingBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginTop: 5,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3b82f6',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  aboutSection: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3b82f6',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  tabNavigator: {
    height: 70,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
