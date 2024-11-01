import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


export default function PassengerSignUpScreen() {
    const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>

       {/* Back Button */}
       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>


      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/P6s639lLZbqnLxRKqRO0ecB5viljP8TZAWJ38LY8qfVpx2nTA.jpg' }}
        />
        <Text style={styles.logoText}>
          WIN <Text style={styles.highlight}>WIN</Text>
        </Text>
      </View>
      <Text style={styles.title}>Passenger Sign Up</Text>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Email"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Mobile Number"
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>NIC</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your NIC Number"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Your Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Register</Text>
      </TouchableOpacity>
      <View style={styles.footer}>
        <Text>Already registered?</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('PassengerSignIn')}>
          <Text style={styles.linkText}> Sign in here</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
    alignItems: 'center',
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },

  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  highlight: {
    color: '#FFA500',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  formGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    display: 'block',
    textAlign: 'left',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 5,
  },
  btn: {
    width: '100%',
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    color: '#000',
    textAlign: 'center',
  },
  linkText: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    alignItems: 'center'
  },
});
