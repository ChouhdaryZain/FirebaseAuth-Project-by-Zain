import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native'
import React from 'react'
import { StatusBar } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation()

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Successfully signed out
        Alert.alert("Logged Out", "You have been logged out successfully.");
        navigation.navigate('Login');
      })
      .catch(error => {
        // Handle any errors during sign out
        console.error("Logout error:", error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

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
})