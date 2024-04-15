import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, TouchableWithoutFeedback, ScrollView} from 'react-native';
import { Check, ArrowDown, ArrowULeftDown, CaretDown } from "phosphor-react-native";

const RegisterScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Handling Back navigation, if necessary
  const handleBack = () => {
    // navigate back
  };

  // Handling Sign Up submission
  const handleSignUp = () => {
    // sign up logic
  };

  // Handling navigation to the Login screen
  const handleGoToLogin = () => {
    // navigate to login screen
  };

  const selectGender = (selectedGender) => {
    setGender(selectedGender);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
        <View></View>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Registrar</Text>
       <ScrollView>
      <TextInput placeholder="Nome" style={styles.input} />
      <TextInput placeholder="Email" style={styles.input} />
      <TouchableOpacity style={styles.dropdown} onPress={() => setModalVisible(true)}>
        <Text style={styles.dropdownText}>{gender || "Gênero"}</Text>
        <CaretDown size={20} color="#414141" weight="bold" />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalView}>
              <TouchableOpacity onPress={() => selectGender('Masculino')}>
                <Text style={styles.genderText}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => selectGender('Feminino')}>
                <Text style={styles.genderText}>Feminino</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <TextInput placeholder="Número de telefone" style={styles.input} />

      <TextInput placeholder="Número do BI" style={styles.input} />

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

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Já tem uma conta?</Text>
        <TouchableOpacity onPress={handleGoToLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
      </ScrollView> 
    </View>
    
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Ajuste conforme a cor de fundo da imagem
        paddingHorizontal: "7%"
      },
    backButton: {

      marginBottom: "2%",
      marginTop: "20%",
    },
    backButtonText: {
      fontSize: 18,
      color: '#000000',
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        marginTop: "7%",
        marginBottom: "10%",
        color: '#000',
    },
    input: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: "5.5%",
      fontSize: 15,
      marginBottom: "7%",
      borderWidth: 1,
      borderColor: '#B8B8B8',
    },
    dropdown: {
      backgroundColor: '#fff',
      borderRadius: 10,
      paddingVertical: "5.5",
      padding: "5.5%",
      marginBottom: "7%",
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#B8B8B8',
    },
    dropdownText: {
      fontSize: 15,
      color: '#D0D0D0',
    },
    disclaimer: {
      fontSize: 14,
      color: '#707070',
      textAlign: 'center',
      marginBottom: 30,
    },
    signUpButton: {
      backgroundColor: '#2D93EA',
      borderRadius: 40,
      paddingVertical: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 17,
    },
    signUpButtonText: {
      fontSize: 20,
      color: '#FFFFFF',
      fontWeight: '500',
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
    },
    footerText: {
      fontSize: 16,
      color: '#000000',
      marginRight: 5,
    },
    loginText: {
      fontSize: 16,
      color: '#007AFF',
      fontWeight: '600',
    },modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      genderText: {
        fontSize: 18,
        marginBottom: 15,
        color: '#000',
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
      linkText: {
        color: "#2D93EA", // A cor para textos clicáveis
        textDecorationLine: "underline",
      },
  });
  

export default RegisterScreen;
