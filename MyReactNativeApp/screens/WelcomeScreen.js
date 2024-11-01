import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
    const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/P6s639lLZbqnLxRKqRO0ecB5viljP8TZAWJ38LY8qfVpx2nTA.jpg' }}
        />
      </View>
      <Text style={styles.title}>Let's Get Started</Text>
      <Text style={styles.title}>Are You Driver Or Passenger ? </Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.signInButton]}
          onPress={() => navigation.navigate('PassengerSignIn')} // Handle Sign in button press
        >
          <Text style={styles.buttonText}>PASSENGER</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.signUpButton]}
          onPress={() => navigation.navigate('DriverSignIn')} // Handle Sign Up button press
        >
          <Text style={styles.buttonTextWhite}>DRIVER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInButton: {
    backgroundColor: '#f0f0f0',
  },
  signUpButton: {
    backgroundColor: '#000000',
  },
  buttonText: {
    color: '#000000',
    fontSize: 16,
  },
  buttonTextWhite: {
    color: '#ffffff',
    fontSize: 16,
  },
});
