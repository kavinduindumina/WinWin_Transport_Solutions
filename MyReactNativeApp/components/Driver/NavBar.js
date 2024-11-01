import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation


const NavBar = () => {
  const navigation = useNavigation(); // Access navigation prop

  const handleHomePress = () => {
    navigation.navigate('DriverHome'); // Navigate to DriverHome screen
  };

  const handleProfilePress = () => {
    navigation.navigate('DriverInfo'); 
  };

  const handleSettingsPress = () => {
    navigation.navigate('DriverSettings'); 
  };

  return (
    <View style={styles.navBar}>
      <TouchableOpacity style={styles.navItem} onPress={handleHomePress}>
        <Text style={styles.navIcon} >🏠</Text>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Text style={styles.navIcon}>📜</Text>
        <Text style={styles.navText}>History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={handleProfilePress}>
        <Text style={styles.navIcon}>👤</Text>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={handleSettingsPress}> 
        <Text style={styles.navIcon}>⚙️</Text>
        <Text style={styles.navText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NavBar;  // Default export instead of named export

const styles = StyleSheet.create({
  navBar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    fontSize: 20,
  },
  navText: {
    fontSize: 12,
    marginTop: 5,
    color: '#888',
  },
});
