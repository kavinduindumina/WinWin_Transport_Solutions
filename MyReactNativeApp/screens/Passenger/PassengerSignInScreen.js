import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function PassengerSignInScreen() {
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
      </View>
      <Text style={styles.logoText}>
        WIN <Text style={styles.highlight}>WIN</Text>
      </Text>
      <Text style={styles.title}>Passenger Sign In</Text>
    
      <View style={styles.formGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          keyboardType="email-address"
        />
      </View>
      <View style={styles.formGroup}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          secureTextEntry
        />
      </View>
      <TouchableOpacity
      onPress={() => navigation.navigate('PassengerHome')}
       style={styles.btn}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>Are you a new user?</Text>
        <TouchableOpacity 
        onPress={() => navigation.navigate('PassengerSignUp')}>
          <Text style={styles.linkText}> Register Here</Text>
          
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
    padding: 20,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logo: {
    marginBottom: 10,
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
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
    fontSize: 20,
    marginBottom: 20,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
  },
  formGroup: {
    width: '100%',
    marginBottom: 15,
    textAlign: 'left',
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 14,
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
  forgotPassword: {
    marginTop: 10,
  },
  linkText: {
    color: '#000',
    textDecorationLine: 'underline',
  },
  register: {
    marginTop: 20,
    alignItems: 'center',
  },
});