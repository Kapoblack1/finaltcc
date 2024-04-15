import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";
import { CaretLeft, MapPin } from "phosphor-react-native";
const CarListScreen = () => {
  // Mock data for the cars, this would typically come from an API call
  const carsData = [
    {
      id: "1",
      name: "Toyota Tundra",
      price: "50$",
      seats: "5 lugares",
      distance: "800m",
      eta: "5mins away",
      image: require("../../../assets/car1.png"),
    },
    {
        id: "2",
        name: "Toyota Tundra",
        price: "50$",
        seats: "5 lugares",
        distance: "800m",
        eta: "5mins away",
        image: require("../../../assets/car2.png"),
      },
      {
        id: "3",
        name: "Toyota Tundra",
        price: "50$",
        seats: "5 lugares",
        distance: "800m",
        eta: "5mins away",
        image: require("../../../assets/car2.png"),
      },
   
    // ... other car data
  ];
  const result = 18;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => console.log("Back button pressed")}
          style={styles.back}
        >
          <CaretLeft size={20} color="#000" />

          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Carros disponíveis</Text>
        <Text style={styles.results}>{result} carros encontrados</Text>
      </View>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={styles.tabButton}>
          <Text style={styles.tabText}>Carpool</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabButton2}>
          <Text style={styles.tabText2}>Transporte Público</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.carList}>
        {carsData.map((car) => (
          <View key={car.id} style={styles.carContainer}>
            <View style={styles.information}>
              <View>
                <Text style={styles.carName}>{car.name}</Text>
                <Text style={styles.carDetails}>
                  Preço {car.price} | {car.seats}
                </Text>
                <View style={styles.center}>
                <MapPin size={18} color="#000" weight="fill"/>
                <Text style={styles.carDetails}>
                 {car.distance} ({car.eta})
                </Text>
                </View>
              </View>
              <Image source={car.image} style={styles.carImage} />
            </View>
            <TouchableOpacity style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Confirmar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const isIphone = Platform.OS === "ios";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    justifyContent: "space-between",
    paddingHorizontal: "2%",
  },
  back: {
    flexDirection: "row",
    marginTop: isIphone ? 0 : "10%",
    marginBottom: "8%",
    alignContent: "center",
    alignItems: "center",
  },
  backButton: {
    fontSize: 18,
    marginLeft: "2%",
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: "bold",
    marginHorizontal: "6%",
  },
  results: {
    marginVertical: "2%",
    marginHorizontal: "7%",
    color: "#B8B8B8",
  },

  tabContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: "2%",
    paddingHorizontal: "4.5%",
    marginBottom: "5%"

  },
  tabButton: {
    backgroundColor: "#188AEC",
    borderRadius: 40,
    width: "47%",
    height: 55,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  tabButton2: {
    backgroundColor: "#fff",
    borderRadius: 40,
    width: "47%",
    height: 55,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#188AEC",
  },
  tabText: {
    fontSize: 16,
    color: "#fff",
  },
  tabText2: {
    fontSize: 16,
    color: "#188AEC",
  },
  carList: {
    flex: 1,
  },
  carContainer: {
    padding: 10,
    backgroundColor: "#F8F9FD",
    marginHorizontal: "6%",
    borderRadius: 10,
    marginBottom: 19
  },
  information:{
    flexDirection: "row"
  },
  carImage: {
    width: "60%",
    height: "100%", // Adjust height accordingly
    resizeMode: "contain",
    paddingRight: "4%"
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  carDetails: {
    fontSize: 16,
    marginVertical: 3
  },
  center:{
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row"
  },
  confirmButton: {
    backgroundColor: "#188AEC",
    padding: 14,
    marginHorizontal: "6%",
    borderRadius: 30,
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CarListScreen;
