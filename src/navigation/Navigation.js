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
import HomeScreenP from '../screens/passenger/HomeScreenP';
import TravelInformation from '../screens/passenger/TravelInfomation';
import ThanksScreen from '../screens/passenger/ThanksScreen';
import LoginScreen2 from '../screens/passenger/LoginScreen';
import RegisterScreen from '../screens/passenger/RegisterScreen';
import OTPScreen from '../screens/passenger/OTPScreen';
import HomeScreenC from '../screens/driver/HomeScreenP';
import teste from '../screens/passenger/teste';
import OTPInput from '../../components/OTPinput';
import CarListScreen from '../screens/passenger/CarListScreen';
import CreatTravel from '../screens/driver/CreatTravel';





const Stack = createStackNavigator();

export default function Navigation(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login2" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Login1" component={LoginScreen1}/>
        <Stack.Screen name="Login2" component={LoginScreen2}/>
        <Stack.Screen name="PhoneVerificationScreen" component={PhoneVerificationScreen}/>
        <Stack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <Stack.Screen name="DriverScreen" component={DriverScreen}/>
        <Stack.Screen name="PassengerScreen" component={PassengerScreen}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen}/>    
        <Stack.Screen name="SearchTripsScreen" component={SearchTripsScreen}/>
        <Stack.Screen name="TripDetailsScreen" component={TripDetailsScreen}/>
        <Stack.Screen name="HomeScreenP" component={HomeScreenP}/>
        <Stack.Screen name="TravelInformation" component={TravelInformation}/>
        <Stack.Screen name="ThanksScreen" component={ThanksScreen}/>
        <Stack.Screen name="LoginP" component={LoginScreen2}/>
        <Stack.Screen name="RegisterScreen" component={RegisterScreen}/>
        <Stack.Screen name="OTPScreen" component={OTPScreen}/>
        <Stack.Screen name="teste" component={teste}/>
        <Stack.Screen name="HomeScreenC" component={HomeScreenC}/>
        <Stack.Screen name="OTPInput" component={OTPInput}/>
        <Stack.Screen name="CarListScreen" component={CarListScreen}/>
        <Stack.Screen name="CreatTravel" component={CreatTravel}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};