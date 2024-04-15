import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { useNavigation } from "@react-navigation/native";



export default function TripDetailsScreen({ route }) {
  const { origin, destination, distance, price, destinationName } =
    route.params;
  const navigation = useNavigation();
  const [availableSeats, setAvailableSeats] = useState("");
  const [tripTime, setTripTime] = useState("");

  // Adicionando console.log para debugar
  console.log("destinationName:", destinationName);
  console.log("Origin:", origin);
  console.log("Destination:", destination);

  const handleScheduleTrip = async () => {
    if (!availableSeats || !tripTime) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }
  
    try {
      // Certifique-se de estar autenticado no Firebase para obter o UID do usuário
      const userId = firebase.auth().currentUser?.uid;
      if (!userId) {
        Alert.alert("Erro", "Usuário não autenticado.");
        return;
      }
  
      const tripData = {
        userId,
        origin: origin, // ou origin se quiser salvar as coordenadas
        destination: destinationName,
        destination,
        distance,
        price,
        availableSeats,
        tripTime,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      };
  
      await firebase.firestore().collection("trips").add(tripData);
      Alert.alert("Sucesso", "Viagem agendada com sucesso.");
      navigation.goBack(); // ou navegue para outra tela conforme desejado
    } catch (error) {
      console.error("Erro ao agendar viagem:", error);
      Alert.alert("Erro ao agendar viagem", error.message);
    }
  };
  return (
    <View style={styles.container}>
      {/* Garantindo que objetos sejam convertidos para string de forma adequada */}
      <Text>Origem: {origin ? JSON.stringify(origin) : "N/A"}</Text>
      <Text>Destino: {destinationName}</Text>
      <Text>Distância: {distance ? `${distance} km` : "N/A"}</Text>
      <Text>Preço: {price ? `$${price}` : "N/A"}</Text>
      <TextInput
        placeholder="Número de lugares vagos"
        value={availableSeats}
        onChangeText={setAvailableSeats}
        keyboardType="number-pad"
        style={styles.input}
      />
      <TextInput
        placeholder="Horário da viagem (HH:mm)"
        value={tripTime}
        onChangeText={setTripTime}
        style={styles.input}
      />
      {/* Botão para voltar ou para realizar outra ação */}
      <TouchableOpacity onPress={handleScheduleTrip} style={styles.button}>
        <Text style={styles.buttonText}>Agendar Viagem</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 20,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    width: "100%",
  },
  button: {
    backgroundColor: '#34C759',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
