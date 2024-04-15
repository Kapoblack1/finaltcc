// components/LoginPage.js
import React from "react";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Check } from "phosphor-react-native";

const LoginScreen = ({
  onLoginPress,
  onSignUpPress,
  onForgotPasswordPress,
}) => {
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <Text style={styles.subtitle}>Seja bem vindo ao booleia</Text>

      <Text style={styles.title}>Email</Text>

      <TextInput
        placeholder="Ex .passageiro@hotmail.com"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor={"#000"}
      />
      <Text style={styles.title}>Passageiro</Text>
      <TextInput
        placeholder="*******************"
        secureTextEntry
        style={styles.input}
        placeholderTextColor={"#000"}
      />

      <TouchableOpacity onPress={onForgotPasswordPress}>
        <Text style={styles.forgotPasswordText}>Esqueceu a palavra passe?</Text>
      </TouchableOpacity>

      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          onPress={() => setAgreeToTerms(!agreeToTerms)}
          style={styles.checkbox}
        >
          {agreeToTerms && (
            <View style={styles.checked}>
              <Check size={15} color="#2D93EA" weight="bold" />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          Ao inscrever-se concordo com os nossos
          <Text style={styles.linkText}> Termos e Condições </Text>e com a
          <Text style={styles.linkText}> Política de Privacidade.</Text>
        </Text>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onSignUpPress} style={styles.signUpButton}>
        <Text>Não tem uma conta?</Text>
        <Text style={styles.signUpText}> Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: "8%",
    backgroundColor: "#ffffff", // Ajuste conforme a cor de fundo da imagem
  },
  header: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: "45%",
    marginBottom: 20,
    color: "#000",
  },
  title: {
    fontSize: 16,
    color: "#B9C3CD", // Ajuste conforme a cor do subtítulo da imagem
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 40,
    color: "#B9C3CD",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#B9C3CD", // Ajuste conforme a cor da linha do input na imagem
    marginBottom: 45,
    fontSize: 16,
    paddingVertical: 10,
  },
  forgotPasswordText: {
    textAlign: "right",
    color: "#2D93EA", // A cor normalmente usada para links
    marginBottom: 25,
  },
  loginButton: {
    backgroundColor: "#2D93EA", // A cor do botão de login na
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 24,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
  },
  termsText: {
    fontSize: 12,
    color: "#2D93EA",
    textAlign: "center",
    marginBottom: 15,
  },
  linkText: {
    color: "#2D93EA", // A cor para textos clicáveis
    textDecorationLine: "underline",
  },
  signUpButton: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signUpText: {
    fontSize: 16,
    color: "#2D93EA",
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#2D93EA",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  checked: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 30,
    borderColor: "#2D93EA",
    backgroundColor: "#fff", // Checkbox checked color
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: "#B9C3CD",
    fontFamily: "Poppins_400Regular",
  },
});

export default LoginScreen;
