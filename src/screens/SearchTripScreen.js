import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

// Adiciona `route` nos parâmetros para acessar os dados passados na navegação
export default function SearchTripsScreen({ route, navigation }) {
  const { origin, destination, destinationName } = route.params; // Extrai os parâmetros passados
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const tripsRef = firebase.firestore().collection('trips');
        const snapshot = await tripsRef.get();

        if (!snapshot.empty) {
          const fetchedTrips = snapshot.docs.map(doc => {
            const trip = doc.data();
            return {
              id: doc.id,
              availableSeats: trip.availableSeats,
              createdAt: trip.createdAt,
              destination: trip.destination,
              distance: trip.distance,
              origin: trip.origin,
              price: trip.price,
              tripTime: trip.tripTime,
              userId: trip.userId,
            };
          });
          setTrips(fetchedTrips);
        } else {
          console.log("Nenhuma viagem encontrada.");
          setTrips([]);
        }
      } catch (error) {
        console.error("Erro ao buscar viagens:", error);
      }
    };

    fetchTrips();
  }, []);

  return (
    <View style={styles.container}>
      {/* Mostra a origem e o destino do passageiro */}
      <Text style={styles.header}>Sua busca:</Text>
      <Text style={styles.subHeader}>Origem: Lat {origin.latitude}, Long {origin.longitude}</Text>
      <Text style={styles.subHeader}>Destino: Lat {destination.latitude} Long {destination.longitude}</Text>
      <Text style={styles.subHeader}> {destinationName} </Text>

      <Text style={styles.title}>Viagens Disponíveis</Text>
      <FlatList
        data={trips}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.tripItem}>
            <Text>Destino: Lat {item.destination.latitude}, Long {item.destination.longitude}</Text>
            <Text>Origem: Lat {item.origin.latitude}, Long {item.origin.longitude}</Text>
            <Text>Distância: {item.distance.toFixed(2)} km</Text>
            <Text>Preço: ${item.price.toFixed(2)}</Text>
            <Text>Assentos disponíveis: {item.availableSeats}</Text>
            <Text>Horário da viagem: {item.tripTime}</Text>
            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('TripDetails', { tripId: item.id })}
            >
              <Text style={styles.detailsButtonText}>Ver Detalhes</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  tripItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 10,
  },
  detailsButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  detailsButtonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
