import React, { useState, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig } from '../../config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigation } from '@react-navigation/native';
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function LoginScreen1() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const recaptchaVerifier = useRef(null);

    const registerUser = async (role) => {
        try {
            // Registrar usuário com e-mail e senha
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const userID = user.uid;
            // Salvar detalhes do usuário no Firestore
            await firebase.firestore().collection('usuarios').doc(user.uid).set({
                name,
                email,
                phoneNumber,
                gender,
                role, // 'driver' ou 'passenger'
            });

            // Prossiga para a verificação do telefone
            navigation.navigate('Login', { phoneNumber, userID });

        } catch (error) {
            Alert.alert("Registration failed", error.message);
        }
    };

    return (
        <View style={styles.container}>
            <FirebaseRecaptchaVerifierModal
                ref={recaptchaVerifier}
                firebaseConfig={firebaseConfig}
            />
            <Text style={styles.headerText}>Welcome</Text>
            <Text style={styles.subHeaderText}>Have a better sharing experience</Text>
            {/* Campos de entrada atualizados */}
            <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.textInput} />
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.textInput} />
            <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.textInput} />
            <TextInput placeholder="Phone number with country code" value={phoneNumber} onChangeText={setPhoneNumber} keyboardType="phone-pad" style={styles.textInput} />
            <TextInput placeholder="Gender" value={gender} onChangeText={setGender} style={styles.textInput} />
            <TouchableOpacity style={styles.button} onPress={() => registerUser('passenger')}>
                <Text style={styles.buttonText}>Register as Passenger</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => registerUser('driver')}>
                <Text style={styles.buttonText}>Register as Driver</Text>
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
  