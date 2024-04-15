import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect,
} from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import * as Permissions from "expo-permissions";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import config from "../../configApi";

export default function HomeScreen({ route }) {
  const bottomSheetRef = useRef(null);
  const userId = route.params?.userId;
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [price, setPrice] = useState(null);
  const mapEl = useRef(null);

  useEffect(() => {
    if (userId) {
      // Aqui você pode realizar ações baseadas no ID do usuário, como buscar informações do usuário
      console.log("UserID:", userId);
    }
  }, [userId]);
  
  useEffect(() => {
    (async function obterLocalizacao() {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        try {
          const location = await Location.getCurrentPositionAsync({
            enableHighAccuracy: true,
          });
          console.log(location);
          setOrigin({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.00092,
            longitudeDelta: 0.0031,
          });
        } catch (error) {
          console.error("Erro ao obter a localização", error);
        }
      } else {
        console.log("Permissão de localização negada");
        // Lide com a recusa da permissão ou forneça uma alternativa aqui
      }
    })();
  }, []);

  // Defina os pontos de ancoragem para o bottom sheet
  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleSheetChanges = useCallback((index) => {
    console.log("Bottom sheet position changed to index", index);
  }, []);

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => bottomSheetRef.current?.collapse()}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Select address</Text>
    </View>
  );

  const renderContent = () => (
    <BottomSheetScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="From" style={styles.input} />
        <TextInput placeholder="To" style={styles.input} />
      </View>
      <View style={styles.recentPlaces}>
        <Text style={styles.recentPlacesTitle}>Recent places</Text>
        {/* Aqui você renderizaria a lista de locais recentes, possivelmente mapeando um array de dados */}
      </View>
    </BottomSheetScrollView>
  );

  return (
    <GestureHandlerRootView style={styles.flexOne}>
      <View style={styles.flexOne}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={styles.map}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={origin}
              showsUserLocation={true}
              loadingEnabled={true}
              locale="pt-br"
              ref={mapEl}
            >
              
              {destination && (
                <MapViewDirections
                  origin={origin}
                  destination={destination}
                  apikey={config.googleApi}
                  strokeColor="blue"
                  strokeWidth={3}
                  onReady={(result) => {
                    console.log(result);
                    setDistance(result.distance);
                    setPrice(result.distance * 150);
                    mapEl.current.fitToCoordinates(result.coordinates, {
                      edgePadding: {
                        top: 280,
                        bottom: 100,
                        left: 110,
                        right: 150,
                      },
                    });
                  }}
                />
              )}
            </MapView>
          </View>
          <View>
            {distance && (
              <View>
                <Text>Distance {distance}</Text>
                <Text>Preço: {price}</Text>
              </View>
            )}
          </View>
          <View style={styles.search}>
            <GooglePlacesAutocomplete
              placeholder="Search"
              onPress={(data, details = null) => {
                // Certifique-se de que 'details' não é null
                if (details && details.geometry) {
                  const newDestination = {
                    latitude: details.geometry.location.lat,
                    longitude: details.geometry.location.lng,
                    latitudeDelta: 0.00092,
                    longitudeDelta: 0.0031,
                  };
                  setDestination(newDestination);
                }
              }}
              query={{
                key: config.googleApi,
                language: "pt-br",
              }}
              fetchDetails={true}
              styles={{ listView: { height: 100 } }}
            />
            <View>
              <Text></Text>
            </View>
          </View>

          <StatusBar style="auto" />
        </KeyboardAvoidingView>
        <BottomSheet
          ref={bottomSheetRef}
          index={1} // Ponto de partida definido para 50% da tela
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
        >
          {renderHeader()}
          {renderContent()}
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  closeText: {
    fontSize: 18,
    color: "#000",
    position: "absolute",
    right: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  contentContainer: {
    flex: 1,
  },
  searchContainer: {
    padding: 20,
  },
  input: {
    height: 50,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  recentPlaces: {
    padding: 20,
  },
  recentPlacesTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  map: {
    height: "90%",
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  search: {
    height: "70%",
    backgroundColor: "grey",
  },
  // ...restante dos estilos
});
