import React from 'react';
import { StyleSheet, View, Text, Button, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window'); // Get screen dimensions

const MapComponent = () => {
  return (
    <View style={styles.container}>
      {/* Map */}
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 6.927079,
          longitude: 79.861244,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation={true}
        onMapReady={() => console.log('Map is ready')}
      />
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: width,   // Take the full width of the screen
    height: height * 1,  // Set the height to 70% of the screen height
  },

});

export default MapComponent;
