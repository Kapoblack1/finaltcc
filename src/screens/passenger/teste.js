import React, { useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const App = ({ route }) => {
  const { verificationId, name, email, phoneNumber, gender, role, uid } = route.params;

  useEffect(() => {
    const criarColecaoUsuario = async (userId, userData) => {
      try {
        await firebase
          .firestore()
          .collection("users")
          .doc(userId)
          .set(userData);
        Alert.alert("Sucesso", "Usuário criado com sucesso.");
      } catch (error) {
        Alert.alert("Erro", "Falha ao criar coleção de usuário.");
      }
    };

    criarColecaoUsuario(uid, { name, email, phoneNumber, gender, role });
  }, [uid, name, email, phoneNumber, gender, role]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <Text style={styles.resultText}>Criado com sucesso</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  }
});

export default App;
