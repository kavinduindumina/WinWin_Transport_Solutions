import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function LoadingScreen() { // Updated the component name

    const navigation = useNavigation(); // Hook to access navigation

  useEffect(() => {
    // Navigate to WelcomeScreen after 3 seconds
    const timer = setTimeout(() => {
      navigation.navigate('Welcome'); // Replace 'Welcome' with the actual name of your Welcome screen
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer when the component is unmounted
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/P6s639lLZbqnLxRKqRO0ecB5viljP8TZAWJ38LY8qfVpx2nTA.jpg' }}
        />
        <Text style={styles.logoText}>
          WIN <Text style={styles.highlight}>WIN</Text>
        </Text>
      </View>
      <Text style={styles.title}>Transport Solution</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF8C00',
  },
  logoContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  logoText: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  highlight: {
    color: '#FFD700', // Gold color
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
