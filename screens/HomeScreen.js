// Importing necessary components from React Native
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import React from 'react';
import { StatusBar } from 'react-native';

// Importing Firebase authentication methods and configuration
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

// Importing the useNavigation hook from React Navigation
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  // Navigation hook for navigating between screens
  const navigation = useNavigation();

  // Function to handle user logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Successfully signed out, show an alert and navigate to the login screen
        Alert.alert("Logged Out", "You have been logged out successfully.");
        navigation.navigate('Login');
      })
      .catch(error => {
        // Handle any errors that occur during sign out
        console.error("Logout error:", error.message);
      });
  };

  // Rendering the home screen UI
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen;

// Styles for the HomeScreen component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    width: "60%",
    marginTop: 60,
    backgroundColor: "#0782F9",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 45,
  },
  logoText: {
    fontWeight: "700",
    fontSize: 16,
    color: "white",
  }
});
