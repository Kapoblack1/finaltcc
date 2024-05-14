import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';

const GOOGLE_API_KEY = 'AIzaSyBOMpOU5RuQ8fp_ik1oupWh5HRJwAsbMTc'; // Replace this with your Google API key

const reverseGeocodeCoordinates = async (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`;
  try {
    const response = await fetch(url);
    const json = await response.json();
    if (json.results.length > 0) {
      return json.results[0].formatted_address; // Returns the formatted address from the response
    }
    return 'No address found';
  } catch (error) {
    console.error('Error fetching location:', error);
    return 'Error retrieving address';
  }
};

const App = () => {
  const [coords, setCoords] = useState({ latitude: '', longitude: '' });
  const [locationName, setLocationName] = useState('');

  const handleGeocode = async () => {
    const address = await reverseGeocodeCoordinates(coords.latitude, coords.longitude);
    setLocationName(address);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
        <TextInput
          placeholder="Latitude"
          value={coords.latitude}
          onChangeText={(text) => setCoords({ ...coords, latitude: text })}
          style={styles.input}
        />
        <TextInput
          placeholder="Longitude"
          value={coords.longitude}
          onChangeText={(text) => setCoords({ ...coords, longitude: text })}
          style={styles.input}
        />
        <Button title="Get Location Name" onPress={handleGeocode} />
        <Text style={styles.resultText}>{locationName}</Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  resultText: {
    marginTop: 20,
    fontSize: 16,
  }
});

export default App;
