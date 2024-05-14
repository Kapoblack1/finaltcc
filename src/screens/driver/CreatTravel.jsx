import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Platform,
  TextInput,
} from "react-native";
import {
  CaretLeft,
  MapPin,
  Star,
  Money,
  CreditCard,
  TextIndent,
} from "phosphor-react-native";
const CreatTravel = () => {
  const carData = {
    id: "1",
    name: "Toyota Tundra",
    price: "1500",
    seats: "5 lugares",
    distance: "800m",
    eta: "5mins away",
    image: require("../../../assets/car1.png"),
    driver: require("../../../assets/driver.png"),
    driverName: "Alexandre Cafe",
    star: 4.9,
  };
  const [selectedPayment, setSelectedPayment] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => console.log("Back button pressed")}
          style={styles.back}
        >
          <CaretLeft size={20} color="#000" />
          <Text style={styles.backButton}>Rota</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container1}>
        <ScrollView style={styles.container}>
          <View style={styles.root}>
            <View style={styles.pins}>
              <MapPin
                size={25}
                color="#1888E8"
                weight="fill"
                style={styles.pin}
              />
              <MapPin size={25} color="#000" weight="fill" style={styles.pin} />
            </View>
            <View style={styles.marks}>
              <Text style={styles.mark}>Origem</Text>
              <View style={styles.separator}></View>
              <Text style={styles.mark}>Destino</Text>
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.carContainer}>
            <View style={styles.information}>
              <View>
                <Text style={styles.carName}>{carData.name}</Text>

                <View style={styles.center}>
                  <Star size={18} color="#FBC02D" weight="fill" />
                  <Text style={styles.carDetails}>
                    {carData.star} ({carData.reviews} reviews)
                  </Text>
                </View>
              </View>
              <Image source={carData.image} style={styles.carImage} />
            </View>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.carContainer1}>
  <View style={styles.information}>
    <TextInput
      placeholder="Data"
      style={styles.input}
      keyboardType="datetime"
      returnKeyType="done"
    />
  </View>
</View>
<View style={styles.carContainer1}>
  <View style={styles.information}>
    <TextInput
      placeholder="Horário"
      style={styles.input}
      keyboardType="default" // No specific keyboardType for time, using default
      returnKeyType="done"
    />
  </View>
</View>
<View style={styles.carContainer1}>
  <View style={styles.information}>
    <TextInput
      placeholder="Lugares"
      style={styles.input}
      keyboardType="numeric"
      returnKeyType="done"
    />
  </View>
</View>
          
          <View>   
                <TouchableOpacity style={styles.confirmButton}>
                  <Text style={styles.confirmButtonText}>Confirmar Viagem</Text>
                </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const isIphone = Platform.OS === "ios";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container1: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: "6%",
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
  root: {
    flex: 1,
    backgroundColor: "#F8F9FD",
    paddingTop: 10,
    paddingBottom: 10,
    paddingVertical: 20,
    borderRadius: 20,
    flexDirection: "row",
    marginBottom: "5%",
  },
  pins: {
    paddingHorizontal: "4%",
  },
  pin: {
    marginBottom: "37%",
    marginTop: "50%",
  },
  marks: {
    width: "78%",
  },
  mark: {
    paddingVertical: "4%",
    fontSize: "18",
    fontWeight: "500",
    color: "#C1CAD4",
  },
  separator: {
    borderWidth: 1,
    borderColor: "#EEF0F6",
  },
  carContainer: {
    padding: 17,
    backgroundColor: "#F8F9FD",
    borderRadius: 10,
    marginBottom: 19,
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "#188AEC"
  },
  carContainer1: {
    padding: 22,
    backgroundColor: "#F8F9FD",
    borderRadius: 10,
    marginTop: "5%",
    borderWidth: 0.5,
    borderColor: "#B8B8B8"

  },
  information: {
    flexDirection: "row",
  },
  input:{
    width: "100%"
    
  },
  carImage: {
    width: "60%",
    height: "100%", // Adjust height accordingly
    resizeMode: "contain",
    paddingRight: "4%",
  },
  carName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: "5%",
    marginBottom: "5%",
  },
  price: {
    fontSize: 18,
    marginTop: "5%",
    marginBottom: "8%",
  },
  center: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    paddingBottom: 20,
    paddingTop: 10,
  },
  center1: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  center2: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
  },
  carDetails: {
    color: "#B8B8B8",
    marginLeft: "3%",
  },
  driver: {
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
  },
  driverImage: {
    resizeMode: "cover",
    height: 110,
    width: 105,
    borderRadius: 190,
    marginRight: "9%",
    backgroundColor: "#E8F4FF",
    borderWidth: 1,
    borderColor: "#188AEC",
  },
  driverName: {
    fontSize: 30,
    fontWeight: "450",
    color: "#5A5A5A",
  },
  select: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: "#5A5A5A",
  },
  money: {
    marginLeft: 30,
    fontSize: 18,
  },
  confirmButton: {
    backgroundColor: "#188AEC",
    padding: 14,

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
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    marginVertical: 8,
    backgroundColor: "#F8F9FD"
  },
  selectedPayment: {
    borderColor: "#188AEC", // Cor para indicar a seleção
  },
});

export default CreatTravel;