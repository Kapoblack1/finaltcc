import React, { useState, useRef } from "react";
import { View, TextInput, StyleSheet, Alert } from "react-native";
import firebase from "firebase/compat/app"; // Ensure Firebase is imported correctly
import "firebase/compat/auth";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation

export default function OTPInput({ verificationId, name, email, phoneNumber, gender, role }) {
  const length = 6; // Fixed length for 6 digits
  const [code, setCode] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);
  const navigation = useNavigation(); // Initialize navigation

  const confirmCode = async (completedCode) => {
    try {
      const credential = firebase.auth.PhoneAuthProvider.credential(verificationId, completedCode);
      const userCredential = await firebase.auth().signInWithCredential(credential);

      // Store user details in Firestore only after successful verification
      await firebase.firestore().collection("users").doc(userCredential.user.uid).set({
        name,
        email,
        phoneNumber,
        gender,
        role
      });

      Alert.alert("Registration Successful", "User created successfully.");

      // Navigate based on the role
      if (role === 'passageiro') {
        navigation.navigate('HomeScreenP');
      } else if (role === 'condutor') {
        navigation.navigate('HomeScreen');
      } else {
        navigation.navigate('DriverScreen'); // Default or error handling
      }
    } catch (error) {
      console.error("Verification failed:", error);
      Alert.alert("Verification Failed", error.message);
    }
  };

  const focusNext = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (index < length - 1 && value) {
      inputsRef.current[index + 1].focus();
    } else if (index === length - 1 && newCode.join("").length === length) {
      inputsRef.current[index].blur();
      confirmCode(newCode.join(""));
    }
  };

  const focusPrevious = (key, index) => {
    if (key === "Backspace" && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleChange = (text, index) => {
    focusNext(index, text);
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={styles.cell}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  cell: {
    width: 40,
    height: 40,
    margin: 5,
    fontSize: 18,
    textAlign: "center",
    borderBottomWidth: 2,
    borderColor: "gray",
  },
});
