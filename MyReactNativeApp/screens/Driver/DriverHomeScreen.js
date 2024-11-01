import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Alert, TouchableHighlight } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import polyline from '@mapbox/polyline';
import NavBar from "../../components/Driver/NavBar";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axiosInstance from '../../services/axiosInstance';

const GOOGLE_MAPS_APIKEY = ''; // Replace with your Google API Key

const DriverHomeScreen = () => {
  const navigation = useNavigation();
  const [startLocation, setStartLocation] = useState('');
  const [endLocation, setEndLocation] = useState('');
  const [startSuggestions, setStartSuggestions] = useState([]);
  const [endSuggestions, setEndSuggestions] = useState([]);
  const [region, setRegion] = useState({
    latitude: 7.8731,    // Sri Lanka's latitude
    longitude: 80.7718,   // Sri Lanka's longitude
    latitudeDelta: 1.5,
    longitudeDelta: 1.5,
  });
  const [markers, setMarkers] = useState([]);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const fetchPlaceSuggestions = async (input, setSuggestions) => {
    if (input.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=${GOOGLE_MAPS_APIKEY}&components=country:LK`
        );
        const data = await response.json();
        if (data.predictions) {
          setSuggestions(data.predictions);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const fetchDirections = async (startCoords, endCoords) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${startCoords.latitude},${startCoords.longitude}&destination=${endCoords.latitude},${endCoords.longitude}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const route = data.routes[0];
        const points = polyline.decode(route.overview_polyline.points);
        const routeCoords = points.map(point => ({
          latitude: point[0],
          longitude: point[1],
        }));

        setRouteCoordinates(routeCoords);
        setDistance(route.legs[0].distance.text); // Set the distance
        setDuration(route.legs[0].duration.text); // Set the duration
      } else {
        alert('Route not found!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLocationSelect = async (placeId, type) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${GOOGLE_MAPS_APIKEY}`
      );
      const data = await response.json();
      const { lat, lng } = data.result.geometry.location;

      if (type === 'start') {
        setMarkers(prev => [{ latitude: lat, longitude: lng, title: 'Start' }, ...prev]);
        setStartSuggestions([]); // Clear suggestions after selection
      } else {
        setMarkers(prev => [...prev, { latitude: lat, longitude: lng, title: 'End' }]);
        setEndSuggestions([]); // Clear suggestions after selection
      }

      setRegion({
        ...region,
        latitude: lat,
        longitude: lng,
      });

      return { latitude: lat, longitude: lng }; // Return the coordinates
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRide = async () => {
    if (markers.length >= 2) {
      const startCoords = markers[0];
      const endCoords = markers[1];

      // Fetch and show the route and distance
      fetchDirections(startCoords, endCoords);
    } else {
      alert('Please enter both start and end locations');
    }
  };


  const handleBookRide = async (rideData) => {
    if (!rideData) {
      Alert.alert('Error', 'Ride data is missing');
      return;
    }
    try {
      const response = await axiosInstance.post('/driver/add-ride', rideData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.data.success) {
        Alert.alert('Success', 'Ride Added successfully!');
        console.log('Ride Added successfully! Ride ID:', response.data.addingId);
      } else {
        Alert.alert('Error', response.data.error || 'Error booking the ride.');
        console.error('Error booking the ride:', response.data.error);

      }
    } catch (err) {
      Alert.alert('Error', 'Failed to book the ride.');
      console.error('Error occurred while booking the ride:', err);
      console.log("Ride data:", rideData);

    }
  };
  




  // New function to clear input and reset state
  const handleClear = () => {
    setStartLocation('');
    setEndLocation('');
    setStartSuggestions([]);
    setEndSuggestions([]);
    setMarkers([]);
    setRouteCoordinates([]);
    setDistance('');
    setDuration('');
    setRegion({
      latitude: 7.8731,
      longitude: 80.7718,
      latitudeDelta: 1.5,
      longitudeDelta: 1.5,
    });
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="black" />
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
      <MapView style={styles.map} region={region}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
            title={marker.title}

          />

        ))}


        {routeCoordinates.length > 0 && (
          <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
        )}
      </MapView>



      <View style={styles.inputContainer}>
        <Text>Start Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter start location"
          value={startLocation}
          onChangeText={text => {
            setStartLocation(text);
            fetchPlaceSuggestions(text, setStartSuggestions);
          }}
        />
        {startSuggestions.length > 0 && (
          <FlatList
            data={startSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleLocationSelect(item.place_id, 'start')}>
                <Text style={styles.suggestionItem}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <Text>End Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter end location"
          value={endLocation}
          onChangeText={text => {
            setEndLocation(text);
            fetchPlaceSuggestions(text, setEndSuggestions);
          }}
        />
        {endSuggestions.length > 0 && (
          <FlatList
            data={endSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleLocationSelect(item.place_id, 'end')}>
                <Text style={styles.suggestionItem}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.addRideButton}
            onPress={handleAddRide}
            underlayColor="darkorange"
          >
            <Text style={styles.addRideButtonText}>View Ride</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.bookRideButton}
            onPress={() => handleBookRide({
              driverId: 1,
              currentPlaceName: startLocation,   // Pass start location name
              destination: endLocation,          // Pass end location name
              distance: distance,                // Use computed distance
              duration: duration,                // Use computed duration
              vehicleId: 1,
            })}
            underlayColor="darkorange"
          >
            <Text style={styles.addRideButtonText}>Add Ride</Text>
          </TouchableHighlight>


          <TouchableHighlight
            style={styles.clearButton}
            onPress={handleClear}
            underlayColor="darkgreen"
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </TouchableHighlight>
        </View>

        {distance ? (
          <Text style={styles.distanceText}>Distance: {distance}</Text>
        ) : null}

        {duration ? (
          <Text style={styles.distanceText}>Distance: {duration}</Text>
        ) : null}

      </View>

      <NavBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  map: {
    flex: 1,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 30,
    left: 30,
  },
  backText: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  inputContainer: {
    padding: 20,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 60,  // Added bottom padding for NavBar
    width: '100%',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  distanceText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row', // Align children in a row
    justifyContent: 'space-between', // Space buttons evenly
    marginTop: 10, // Adjust as needed for spacing
  },
  addRideButton: {
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1, // Allow button to grow
    marginRight: 5, // Add some space between buttons
  },
  bookRideButton: {
    backgroundColor: 'darkorange',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1, // Allow button to grow
    marginRight: 5, // Add some space between buttons
  },
  clearButton: {
    backgroundColor: 'brown',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    flex: 1, // Allow button to grow
  },
  addRideButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  clearButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DriverHomeScreen;
