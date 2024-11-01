import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';

export default function LoginScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logo}>
        <Image
          style={styles.logoImage}
          source={{ uri: 'https://storage.googleapis.com/a1aa/image/P6s639lLZbqnLxRKqRO0ecB5viljP8TZAWJ38LY8qfVpx2nTA.jpg' }}
        />
      </View>
      <Text style={styles.logoText}>
        WIN <Text style={styles.highlight}>WIN</Text>
      </Text>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={styles.tabText}>Driver</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Passenger</Text>
        </TouchableOpacity>
      </View>
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
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPassword}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
      <View style={styles.register}>
        <Text>Are you a new user?</Text>
        <TouchableOpacity>
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
    backgroundColor: '#f5f5f5',
    padding: 20,
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
