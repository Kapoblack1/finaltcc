import React,{useState, useRef, useEffect, useMemo, useCallback} from "react";
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
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
 export default function HomeScreenP() {
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const mapEl = useRef(null);
    const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);



const handleSheetChanges = useCallback((index) => {
  console.log("Bottom sheet position changed to index", index);
}, []);

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

  return (
    <View style={styles.container}>
        <View style={styles.container}>
        <View>
         
        </View>
        <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              region={origin}
              showsUserLocation={true}
              loadingEnabled={true}
              locale="pt-br"
              ref={mapEl}
            >
               <TouchableOpacity style={styles.menuIcon} onPress={() => console.log('Menu clicado')}>
            <CaretLeft size={80} color="#000" /> 
          </TouchableOpacity>
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

    </View>
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
  map: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  menu:{
    position: "absolute",
    paddingTop: 100
  },
  menuIcon: {
    position: "absolute",
    top: 70, // Ajuste este valor conforme necessário
    right: 65,
    padding: 40, // Isso facilita a interação com o toque
    zIndex: 1, // Garante que o ícone fique por cima do mapa
  },
 
});


