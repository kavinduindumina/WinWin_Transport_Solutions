// RideStatusScreen.js

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const RideStatusScreen = ({ navigation }) => {
  const [rideStatus, setRideStatus] = useState(''); // 'completed' or 'cancelled'

  const handleCompleteRide = () => {
    setRideStatus('completed');
  };

  const handleCancelRide = () => {
    setRideStatus('cancelled');
    // Optionally navigate back to PassengerHomeScreen if you want
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Status</Text>

      {rideStatus === '' ? (
        <View>
          <Text style={styles.instructionText}>Please select your ride status:</Text>
          <TouchableOpacity style={styles.button} onPress={handleCompleteRide}>
            <Text style={styles.buttonText}>Complete Ride</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleCancelRide}>
            <Text style={styles.buttonText}>Cancel Ride</Text>
          </TouchableOpacity>
        </View>
      ) : rideStatus === 'completed' ? (
        <View>
          <Text style={styles.successText}>Ride Completed!</Text>
          <Text style={styles.instructionText}>
            You can pay for your ride using cryptocurrency. 
          </Text>
          <TouchableOpacity
            style={styles.payButton}
            onPress={() => {
              // Handle crypto payment logic here
              navigation.navigate('Payment', { amount: 1 });
              alert('Proceeding to pay with cryptocurrency!');
            }}
          >
            <Text style={styles.buttonText}>Pay with Crypto</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.cancelText}>Ride Cancelled!</Text>
      )}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructionText: {
    fontSize: 16,
    marginVertical: 10,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    marginVertical: 10,
  },
  cancelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 5,
  },
  payButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default RideStatusScreen;
