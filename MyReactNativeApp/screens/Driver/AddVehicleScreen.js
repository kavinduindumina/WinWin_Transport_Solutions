import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import axios from 'axios'; // Axios for making HTTP requests
import { useNavigation } from '@react-navigation/native';
import ImageUploader from '../../utils/ImageUploader'; 
import axiosInstance from '../../services/axiosInstance';

const AddVehicleScreen = () => {
  const navigation = useNavigation();
  
  // State for the vehicle image URL and form fields
  const [vehicleImageUrl, setVehicleImageUrl] = useState('');
  const [vehicleType, setVehicleType] = useState('car'); // Default vehicle type
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [seatingCapacity, setSeatingCapacity] = useState('');
  const [vehicleOwner, setVehicleOwner] = useState('me'); // Default owner
  
  // Handle image URL change
  const handleImageUrlChange = (newImageUrl) => {
    setVehicleImageUrl(newImageUrl);
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    if (!vehicleModel || !vehicleNumber || !vehicleColor || !seatingCapacity || !vehicleImageUrl) {
      alert('Please fill in all fields including the vehicle image.');
      return;
    }

    const vehicleData = {
      vehicleNumber,
      vehicleType,
      vehicleModel,
      vehicleColor,
      vehicleOwner,
      vehicleCapacity: parseInt(seatingCapacity), // Ensure seating capacity is a number
      images: vehicleImageUrl, // Pass the uploaded image URL
    };

    try {
      const response = await axiosInstance.post('/vehicle/create-vehicle', vehicleData);
      console.log('Vehicle registered:', response.data);
      alert('Vehicle registered successfully!');

      // Reset form
      setVehicleType('car');
      setVehicleModel('');
      setVehicleNumber('');
      setVehicleColor('');
      setSeatingCapacity('');
      setVehicleImageUrl('');
    } catch (error) {
      console.error('Error registering vehicle:', error);
      alert('Error registering vehicle');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Add Vehicle</Text>

      {/* Vehicle Image Upload */}
      <View style={styles.imageUploaderContainer}>
        <ImageUploader onImageUrlChange={handleImageUrlChange} />
        {vehicleImageUrl ? (
          <Image source={{ uri: vehicleImageUrl }} style={styles.vehicleImage} />
        ) : (
          <Text style={styles.vehicleImagePlaceholder}>No image selected</Text>
        )}
      </View>

      {/* Form Inputs */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Example: Car"
          value={vehicleType}
          onChangeText={setVehicleType}
        />
      </View>
      
      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle Model</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vehicle model"
          value={vehicleModel}
          onChangeText={setVehicleModel}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Vehicle Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vehicle number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Color</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vehicle color"
          value={vehicleColor}
          onChangeText={setVehicleColor}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Seating Capacity</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter seating capacity"
          keyboardType="numeric"
          value={seatingCapacity}
          onChangeText={setSeatingCapacity}
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity style={styles.registerButton} onPress={handleSubmit}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageUploaderContainer: {
    width: '100%',
    height: 150,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginTop: 10,
  },
  vehicleImagePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderRadius: 10,
    backgroundColor: '#e0e0e0',
  },
  registerButton: {
    width: '100%',
    padding: 15,
    borderRadius: 25,
    backgroundColor: '#ffa500',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    fontSize: 18,
    color: '#fff',
  },
});

export default AddVehicleScreen;
