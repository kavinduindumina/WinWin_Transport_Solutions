import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer , } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-get-random-values';
import LoginScreen from './screens/LoginScreen'; // Adjust the path as necessary
import SignupScreen from './screens/SignupScreen'; // Your Signup screen
import LodingScreen from './screens/LodingScreen'; // Your Loding screen
import WelcomeScreen from './screens/WelcomeScreen';
import RideStatusScreen from './screens/RideStatusScreen';
import RideDetailScreen from './screens/RideDetailScreen';
import PaymentScreen from './screens/PayScreen';
import CryptoPaymentScreen from './screens/CryptoPaymentScreen';
import PassengerSignInScreen from './screens/Passenger/PassengerSignInScreen';
import PassengerSignUpScreen from './screens/Passenger/PassengerSignUpScreen';
import PassengerHomeScreen from './screens/Passenger/PassengerHomeScreen'; 
import DriverSignInScreen from './screens/Driver/DriverSignInScreen';  
import DriverSignUpScreen from './screens/Driver/DriverSignUpScreen';
import DriverHomeScreen from './screens/Driver/DriverHomeScreen';  
import DriverInfoScreen from './screens/Driver/DriverInfoScreen';  
import DriverSettingsScreen from './screens/Driver/DriverSettingsScreen';  
import AddVehicleScreen from './screens/Driver/AddVehicleScreen';






const Stack = createStackNavigator();
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer><Stack.Navigator
          initialRouteName="Loding"
          screenOptions={{ headerShown: false }} // Hide the header globally
 >
          
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Loding" component={LodingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="PassengerSignIn" component={PassengerSignInScreen} />
          <Stack.Screen name="PassengerSignUp" component={PassengerSignUpScreen} />
          <Stack.Screen name="PassengerHome" component={PassengerHomeScreen} />
          <Stack.Screen name="DriverSignIn" component={DriverSignInScreen} />
          <Stack.Screen name="DriverSignUp" component={DriverSignUpScreen} />
          <Stack.Screen name="DriverHome" component={DriverHomeScreen} />
          <Stack.Screen name="DriverInfo" component={DriverInfoScreen} />
          <Stack.Screen name="DriverSettings" component={DriverSettingsScreen} />
          <Stack.Screen name="AddVehicle" component={AddVehicleScreen} />
          <Stack.Screen name="RideDetail" component={RideDetailScreen} />
          <Stack.Screen name="RideStatus" component={RideStatusScreen} />
          <Stack.Screen name="CryptoPayment" component={CryptoPaymentScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />



        </Stack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}