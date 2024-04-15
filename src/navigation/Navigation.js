// Navigation.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import PhoneVerificationScreen from '../screens/PhoneVerificationScreen';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen1 from '../screens/LoginScreen1';
import DriverScreen from '../screens/DriverScreen';
import PassengerScreen from '../screens/PassengerScreen';
import TripDetailsScreen from '../screens/TripDetailsScreen';
import SearchTripsScreen from '../screens/SearchTripScreen';




const Stack = createStackNavigator();

export default function Navigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignUpScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Login1" component={LoginScreen1}/>
        <Stack.Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="DriverScreen" component={DriverScreen}/>
        <Stack.Screen name="PassengerScreen" component={PassengerScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>
        
        <Stack.Screen name="SearchTripsScreen" component={SearchTripsScreen}/>
        <Stack.Screen name="TripDetailsScreen" component={TripDetailsScreen}/>


      </Stack.Navigator>
    </NavigationContainer>
  );
};