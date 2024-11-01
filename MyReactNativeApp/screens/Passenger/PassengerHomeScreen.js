import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import MapComponent from '../../components/MapComponent';
import NavBar from '../../components/Driver/NavBar';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for close icon
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

export default function PassengerHomeScreen() {
  const navigation = useNavigation();
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [rideDetails, setRideDetails] = useState([]);

  // Fetch user location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let userLocation = await Location.getCurrentPositionAsync({});
      setLocation(userLocation.coords);

      setRegion({
        latitude: userLocation.coords.latitude,
        longitude: userLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  // Function to handle search action
  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.26.152:3000/api/v1/Passenger/ride-details/${searchInput}`);
      const data = await response.json();

      console.log('Response data:', data); // Log the entire response for debugging

      if (response.ok && data && data.data && data.data.length > 0) {
        setRideDetails(data.data); // Accessing the ride details in data.data
      } else {
        console.error('No rides found');
        setRideDetails([]); // Clear previous results if no rides are found
      }
    } catch (error) {
      console.error('Error fetching ride details:', error);
      setRideDetails([]);
    }
  };

  // Function to handle closing the search results
  const handleClose = () => {
    setSearchInput(''); // Clear the search input
    setRideDetails([]); // Clear ride details
  };

  // Fallback message if location is not available
  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Fetching your location...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapComponent />

      {/* Search Box */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchBox}
          placeholder="Search your location..."
          value={searchInput}
          onChangeText={(text) => setSearchInput(text)}
        />
        <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
        {/* Close Button */}
        {searchInput.length > 0 && ( // Show close button only if there's input
          <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        )}
      </View>


      {/* Display ride details if available */}
      {rideDetails.length > 0 ? (
        <FlatList
          data={rideDetails}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text>Pickup: {item.pickupLocation}</Text>
              <Text>Destination: {item.dropLocation}</Text>
              <Text>Distance: {item.distance} km</Text>
              <Text>Duration: {item.duration}</Text>
              <Text>Cost: LKR {item.distance * 10}</Text>
              <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('RideDetail', {
                  startLocation: item.pickupLocation,
                  endLocation: item.dropLocation,
                  distance: item.distance,
                  duration: item.duration,
                  cost: item.distance * 10, // Assuming you have cost in your data
                  driverName: item.driverName, // Assuming you have driver details in your data
                  driverContact: item.driverContact, // Assuming you have driver contact in your data
                  vehicleDetails: item.vehicleDetails, // Assuming you have vehicle details in your data
                });
              }}>
                <Text style={styles.buttonText}>View Details</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noRidesText}>No rides found for this location.</Text>
      )}

      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    position: 'absolute',
    top: 10,
  },
  searchBox: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    position: 'absolute',
    top: 40,
    backgroundColor: '#fff',
  },
  searchButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: '#FFA500',
    padding: 10,
    borderRadius: 5,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    top: 20,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    top: 10,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
  },
  noRidesText: {
    color: '#888',
    marginTop: 20,
  },
  bottomBar: {
    width: '100%',
    padding: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    bottom: 0,
    alignItems: 'center',
  },
  button: {
    width: '90%',
    backgroundColor: '#FFA500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
