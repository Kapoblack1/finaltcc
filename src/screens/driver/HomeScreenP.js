import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
  Dimensions,
  useCallback,
} from "react";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import * as Permissions from "expo-permissions";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import {
  View,
  Text,
  keyboard,
  Platform,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from "react-native";
import config from "../../../configApi";
import MapViewDirections from "react-native-maps-directions";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

export default function HomeScreenC({ route }) {
  const mapEl = useRef(null);
  const userId = route.params?.userId;
  const bottomSheetRef = useRef(null);
  const [price, setPrice] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [distance, setDistance] = useState(null);
  const [destination, setDestination] = useState(null);
  const toggleUserType = () => {
    setUserType(userType === 'passageiro' ? 'condutor' : 'passageiro');
  };
  const [userType, setUserType] = useState('passageiro');
  const [originMarker, setOriginMarker] = useState(null);
  const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [showDestinationInput, setShowDestinationInput] = useState(true);

  const handleSheetChanges = useCallback((index) => {
    console.log("Bottom sheet position changed to index", index);
    if (index === 0) {
      // Assuming 0 is the collapsed state index
      console.log("Hide");
    } else {
      console.log("Expande");
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        console.log("Teclado mostrado");
        expandBottomSheet();
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        console.log("Teclado ocultado");
        hideBottomSheet();
        setShowDestinationInput(true);  // Mostrar input de destino quando teclado ocultado
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const expandBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(2);
  };

  const hideBottomSheet = () => {
    bottomSheetRef.current?.snapToIndex(1);
  };

  useEffect(() => {
    if (userId) {
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
          setOriginMarker({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          });
        } catch (error) {
          console.error("Erro ao obter a localização", error);
        }
      } else {
        console.log("Permissão de localização negada");
      }
    })();
  }, []);

  const definirLocalizacaoAtualComoOrigem = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      try {
        const location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        console.log(location);
        const newOrigin = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.00093,
          longitudeDelta: 0.0031,
        };
        setOrigin(newOrigin);
        setOriginMarker(newOrigin);
      } catch (error) {
        console.error("Erro ao obter a localização", error);
      }
    } else {
      console.log("Permissão de localização negada");
    }
  };

  const handleOriginFocus = () => {
    setShowDestinationInput(false);  // Ocultar input de destino quando origem focado
  };

  // Função chamada quando o campo de destino é focado
  const handleDestinationFocus = () => {
  };

  // Alteração no retorno do componente HomeScreen
  return (
    <GestureHandlerRootView style={styles.flexOne}>
      <View style={styles.flexOne}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : null}
        >
          <View style={styles.map}>
            <MapView
              style={styles.map}
              region={origin}
              showsUserLocation={true}
              loadingEnabled={true}
              locale="pt-br"
              ref={mapEl}
            >
              {originMarker && (
                <Marker coordinate={originMarker} title="Origem" />
              )}
              {destinationMarker && (
                <Marker coordinate={destinationMarker} title="Destino" />
              )}
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
                        top: 90,
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

          <StatusBar style="auto" />
        </KeyboardAvoidingView>
        <BottomSheet
          ref={bottomSheetRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          style={{ borderRadius: 1 }}
        >

          {/*
          <TouchableOpacity
            style={styles.button}
            onPress={definirLocalizacaoAtualComoOrigem}
          >
            <Text style={styles.buttonText}>Definir Localização Atual como origem</Text>
          </TouchableOpacity>
*/}
          {/* Wrapper azul em volta dos inputs de pesquisa */}
          <View style={[styles.searchWrapper, { top: 22 }]}>
    
           {/*<View style={styles.search}>
              <GooglePlacesAutocomplete
                textInputProps={{
                  onFocus: handleOriginFocus, // Directly using the onFocus handler here
                }}
                placeholder="Origem"
                onPress={(data, details = null) => {
                  if (details && details.geometry) {
                    const newOrigin = {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      latitudeDelta: 0.00092,
                      longitudeDelta: 0.0031,
                    };
                    setOrigin(newOrigin);
                    setOriginMarker(newOrigin);
                  }
                }}
                query={{
                  key: config.googleApi,
                  language: "pt-br",
                }}
                fetchDetails={true}
                styles={googleAutocompleteStyles}
              />
            </View> */} 

            {/* Input para destino */}
            {showDestinationInput && (<View style={[styles.search, { zIndex: 1 }]}> 
              <GooglePlacesAutocomplete
                placeholder="    Para onde vamos?"
                textInputProps={{
                  onFocus: handleDestinationFocus, // Usando diretamente o manipulador onFocus aqui
                }}
                onPress={(data, details = null) => {
                  if (details && details.geometry) {
                    const newDestination = {
                      latitude: details.geometry.location.lat,
                      longitude: details.geometry.location.lng,
                      latitudeDelta: 0.00092,
                      longitudeDelta: 0.0031,
                    };
                    setDestination(newDestination);
                    setDestinationMarker(newDestination);
                  }
                }}
                query={{
                  key: config.googleApi,
                  language: "pt-br",
                }}
                fetchDetails={true}
                styles={googleAutocompleteStyles}
              />
            </View>)}

            {!isKeyboardVisible && (
              <TouchableOpacity style={styles.olaButton}>
                <Text style={styles.buttonText}>Procurar</Text>
              </TouchableOpacity>
            )}
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}
const googleAutocompleteStyles = {
  container: {
    flex: 0,
    position: "absolute",
    top: 20,
    width: "100%",
    zIndex: 5,  // Z-Index elevado para garantir que as sugestões fiquem sobre outros elementos
  },
  textInputContainer: {
    backgroundColor: "transparent",
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
  textInput: {
    backgroundColor: "#F8F9FD",
    borderRadius: 36,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    fontSize: 16,
    marginTop: 0,
    marginBottom: 0,
    paddingLeft: 10,
  },
  listView: {
    backgroundColor: "white",
    marginTop: 0,
    elevation: 5,  // Android
    zIndex: 5,  // iOS
  },
  row: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  separator: {
    height: 1,
    backgroundColor: "#DDDDDD",
  },
  poweredContainer: {
    display: "none",
  },
};

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
    height: "100%",
    width: "100%",
    top: -90,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  currentLocationButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,

  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    textAlign: "center"
  },
  olaButton: {
    backgroundColor: "#188AEC",
    paddingVertical: 15,
    paddingHorizontal: 140,
    borderRadius: 5,
    marginTop: 220,
    alignSelf: "center",
    borderRadius: 55,
  },
  searchWrapper: {
    position: 'absolute',
    top: 20,  // Espaço do topo da tela
    width: '100%',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  search: {
    marginBottom: 65,  // Aumente o espaço se necessário para evitar sobreposição
  },
});
