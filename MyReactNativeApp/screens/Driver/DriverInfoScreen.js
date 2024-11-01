import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';  // Import FontAwesome for icons
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/Driver/NavBar';
import { Ionicons } from '@expo/vector-icons';


const DriverInfoScreen = () => {
    const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/cJM1rk6TsoLnHFuea3r99U1lqkIzFl321Mlo9goJMbceAfRnA.jpg' }}
          style={styles.profileImage}
        />
      </View>

      {/* Title */}
      <Text style={styles.title}>Driver Information</Text>

      {/* Profile Picture */}
      <View style={styles.profilePicContainer}>
        <Image
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/ZegtJfdozrrNMEiwL2p92xeQdKoyefTs5W9gNN4aufstOwP6E.jpg' }}
          style={styles.profilePic}
        />
        <Ionicons  size={20} color="black" style={styles.editIcon} />
      </View>

      {/* Form Fields */}
      <View style={styles.formGroup}>
        <Text style={styles.label}>Full name</Text>
        <TextInput style={styles.input} placeholder="Full name" />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} placeholder="Mobile Number" keyboardType="phone-pad" />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Id Number</Text>
        <TextInput style={styles.input} placeholder="Id Number" />
      </View>

      {/* Continue Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
     <NavBar/> 
    </View>
    
  );
};

export default DriverInfoScreen;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'top',
    alignItems: 'center',
    padding: 10,
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 25,
    left: 10,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    top: 25,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profilePicContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e0e0e0',
  },
  editIcon: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    padding: 5,
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e0e0e0',
  },
  button: {
    backgroundColor: '#ffa726',
    padding: 15,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
