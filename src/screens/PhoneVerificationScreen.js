import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useNavigation } from '@react-navigation/native';

const PhoneVerificationScreen = ({ route }) => {
  const [code, setCode] = useState('');
  const verificationId = route.params.verificationId;
  const phoneNumber = route.params.phoneNumber; // Ensure you pass the phoneNumber from LoginScreen to PhoneVerificationScreen
  const userId = route.params?.userId; 
  const navigation = useNavigation();

  const confirmCode = async () => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, code);
      const response = await firebase.auth().signInWithCredential(credential);
      
      const uid = response.user.uid;

      // Include the phone number when storing the user's information
      await firebase.firestore().collection('usuarios').doc(userId).set({
        phoneNumber, // Include this line to store the phone number
        // Add other user details here as needed
      });

      Alert.alert("Verification Successful", "You are logged in!");
      navigation.navigate('HomeScreen');
    } catch (error) {
      Alert.alert("Verification failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Phone Verification</Text>
      <TextInput
        style={styles.input}
        onChangeText={setCode}
        value={code}
        placeholder="Enter your OTP code"
        keyboardType="numeric"
        maxLength={6}
      />
      <TouchableOpacity onPress={confirmCode} style={styles.verifyButton}>
        <Text style={styles.verifyButtonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  resendLink: {
    marginBottom: 20,
  },
  verifyButton: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  verifyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PhoneVerificationScreen;
