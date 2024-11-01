import React, { useEffect } from 'react';
import { StyleSheet, View, Button, Alert , TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout() {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('driverToken'); 
      if (!token) {
        navigation.navigate('DriverSignIn');
      }
    };
    checkToken();
  }, [navigation]);

  const handleLogout = async () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to log out?',
      [
        {
          text: 'No, stay',
          style: 'cancel',
        },
        {
          text: 'Yes, log out',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('driverToken'); // Remove only the driverToken
              Alert.alert('Logged out!', 'You have been logged out.');
              navigation.navigate('DriverSignIn'); 
            } catch (error) {
              console.error('Error during logout:', error);
              Alert.alert('Logout Error', 'An error occurred while logging out.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View >
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    logoutButton: {
        backgroundColor: '#d32f2f',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
});