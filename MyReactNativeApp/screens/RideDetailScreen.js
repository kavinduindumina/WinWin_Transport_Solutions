// RideDetailScreen.js

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

const RideDetailScreen = ({ route, navigation }) => {
  const {
    startLocation,
    endLocation,
    distance,
    duration,
    cost,
    driverName,
    driverContact,
    vehicleDetails,
  } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ride Details</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Start Location: {startLocation}</Text>
        <Text style={styles.label}>End Location: {endLocation}</Text>
        <Text style={styles.label}>Distance: {distance}</Text>
        <Text style={styles.label}>Duration: {duration}</Text>
        <Text style={styles.label}>Cost: {cost}</Text>
        <Text style={styles.label}>Driver Name: {driverName}</Text>
        <Text style={styles.label}>Driver Contact: {driverContact}</Text>
        <Text style={styles.label}>Vehicle Details: {vehicleDetails}</Text>
      </View>

      <TouchableOpacity
        style={styles.joinButton}
        onPress={() => {
          // Add functionality for joining the ride
          navigation.navigate('RideStatus'); 
          alert('Ride Joined!');
        }}
      >
        <Text style={styles.buttonText}>Join Ride</Text>
      </TouchableOpacity>

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
  detailCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    elevation: 2,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginVertical: 5,
  },
  joinButton: {
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButton: {
    marginTop: 10,
    backgroundColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default RideDetailScreen;
