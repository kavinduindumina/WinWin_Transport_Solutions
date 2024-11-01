import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import NavBar from '../../components/Driver/NavBar';
import Logout from '../../components/Driver/Logout';



const DriverSettingsScreen = () => {
    const navigation = useNavigation();

    const handleVehiclePress = () => {
        navigation.navigate('AddVehicle'); 
      };

      const handleProfilePress = () => {
        navigation.navigate('DriverInfo'); 
      };


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            <TouchableOpacity style={styles.menuItem} onPress={handleProfilePress}>
                <Text>Personal Information</Text>
                <Ionicons name="person" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.menuItem} onPress={handleVehiclePress}>
            <Text>Add Vehicle Information</Text>
                <Ionicons name="car" size={20} color="black" />
            </TouchableOpacity>
            {/* Add more menu items as needed */}
           <Logout/>
            <NavBar/>
        </View>
    );
}

export default DriverSettingsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'top',
        top: 20,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    headerTitle: {
        fontSize: 18,
        flexGrow: 1,
        textAlign: 'center',
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    menuItemActive: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ffa726',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        width: '100%',
        alignItems: 'center',
    },
    logoutButton: {
        backgroundColor: '#d32f2f',
        padding: 10,
        borderRadius: 10,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
    },
});
