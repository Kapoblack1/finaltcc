import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { Check, CaretDown } from "phosphor-react-native";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { firebaseConfig } from "../../../config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const RegisterScreen = () => {
  const navigation = useNavigation();
  const recaptchaVerifier = useRef(null);
  const [gender, setGender] = useState("");
  const [role, setRole] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const selectRole = (selectedRole) => {
    setRole(selectedRole);
  };

  const handlePhoneVerification = async (uid) => {
    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider();
      const verificationId = await phoneProvider.verifyPhoneNumber(
        phoneNumber,
        recaptchaVerifier.current
      );
      navigation.navigate("OTPScreen", {
        verificationId,
        phoneNumber,
        name,
        email,
        phoneNumber,
        gender,
        role,
        uid,
      });
    } catch (error) {
      Alert.alert("Phone Verification Failed", error.message);
    }
  };

  const handleSignUp = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !phoneNumber ||
      !gender ||
      !role ||
      !agreeToTerms
    ) {
      Alert.alert("Error", "Please fill all fields and agree to the terms.");
      return;
    }

    try {
      // Cria o usuário com email e senha
      const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      const uid = userCredential.user.uid;

      // Adiciona o usuário à coleção "users"
      await firebase.firestore().collection("users").doc(uid).set({
        name,
        email,
        phoneNumber,
        gender,
        role,
      });

      // Verifica o número de telefone
      handlePhoneVerification(uid);
    } catch (error) {
      Alert.alert("Registration Failed", error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true}
      />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Register</Text>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>{gender || "Select Gender"}</Text>
        <CaretDown size={20} color="#414141" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => setGender("Male")}>
                <Text style={styles.genderText}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setGender("Female")}>
                <Text style={styles.genderText}>Female</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <View style={styles.roleContainer}>
        <TouchableOpacity
          onPress={() => selectRole("passageiro")}
          style={[
            styles.roleButton,
            role === "passageiro" ? styles.roleSelected : {},
          ]}
        >
          <Text
            style={
              role === "passageiro"
                ? styles.roleSelectedText
                : styles.roleButtonText
            }
          >
            passageiro
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => selectRole("condutor")}
          style={[
            styles.roleButton,
            role === "condutor" ? styles.roleSelected : {},
          ]}
        >
          <Text
            style={
              role === "condutor"
                ? styles.roleSelectedText
                : styles.roleButtonText
            }
          >
            condutor
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAgreeToTerms(!agreeToTerms)}
        >
          {agreeToTerms && <Check size={24} color="#2D93EA" />}
        </TouchableOpacity>
        <Text style={styles.checkboxLabel}>
          I agree to the{" "}
          <Text style={styles.linkText}>Terms and Conditions</Text> and{" "}
          <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
      </View>
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: "7%" },
  backButton: { marginBottom: "2%", marginTop: "20%" },
  backButtonText: { fontSize: 18, color: "#000000" },
  title: {
    fontSize: 24,
    fontWeight: "500",
    marginTop: "7%",
    marginBottom: "10%",
    color: "#000",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: "5.5%",
    fontSize: 15,
    marginBottom: "7%",
    borderWidth: 1,
    borderColor: "#B8B8B8",
  },
  dropdown: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: "5.5",
    padding: "5.5%",
    marginBottom: "7%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#B8B8B8",
  },
  dropdownText: { fontSize: 15, color: "#D0D0D0" },
  disclaimer: {
    fontSize: 14,
    color: "#707070",
    textAlign: "center",
    marginBottom: 30,
  },
  signUpButton: {
    backgroundColor: "#2D93EA",
    borderRadius: 40,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 17,
  },
  signUpButtonText: { fontSize: 20, color: "#FFFFFF", fontWeight: "500" },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  footerText: { fontSize: 16, color: "#000000", marginRight: 5 },
  loginText: { fontSize: 16, color: "#007AFF", fontWeight: "600" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  genderText: { fontSize: 18, marginBottom: 15, color: "#000" },
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
    backgroundColor: "#fff",
  },
  checkboxLabel: {
    flex: 1,
    fontSize: 13,
    color: "#B9C3CD",
    fontFamily: "Poppins_400Regular",
  },
  linkText: { color: "#2D93EA", textDecorationLine: "underline" },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  roleButton: {
    borderWidth: 1,
    borderColor: "#B8B8B8",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  roleSelected: {
    backgroundColor: "#2D93EA", // Blue color for selected role
    borderColor: "#2D93EA", // Same as the background
  },
  roleButtonText: {
    textAlign: "center",
    color: "#414141", // Default text color
  },
  roleSelectedText: {
    color: "#FFFFFF", // White color for selected role text
    textAlign: "center",
  },
});

export default RegisterScreen;
