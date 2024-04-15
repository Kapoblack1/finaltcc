import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen({route}) {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const recaptchaVerifier = useRef(null);
  const userId = route.params?.userId;
  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber(phoneNumber, recaptchaVerifier.current)
      .then(verificationId => {
        // Pass both verificationId and phoneNumber to the next screen
        navigation.navigate('PhoneVerificationScreen', { verificationId, phoneNumber, userId }); // Change here
      })
      .catch(error => Alert.alert("Verify phone number failed", error.message));
  };

  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
      />
      <Text style={styles.headerText}>Welcome</Text>
      <Text style={styles.subHeaderText}>Have a better sharing experience</Text>
      <TextInput
        placeholder="Phone number with country code"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        autoCompleteType="tel"
        style={styles.textInput}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={sendVerification}
      >
        <Text style={styles.buttonText}>Send Verification</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  subHeaderText: {
    fontSize: 16,
    marginBottom: 30,
  },
  textInput: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
