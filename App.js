// Importing necessary components and hooks from React, React Native, Firebase, and other libraries
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { useState, useEffect } from 'react';
import { auth } from './firebase'; // Importing the Firebase auth object
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  // Creating a stack navigator
  const Stack = createNativeStackNavigator();

  // State to manage the current user
  const [currentUser, setCurrentUser] = useState(null);

  // State to manage the loading state
  const [loading, setLoading] = useState(true);

  // useEffect hook to monitor the authentication state
  useEffect(() => {
    // Setting up a listener for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);  // Update current user state
      setLoading(false);     // Set loading to false once user is fetched
    });
    // Cleanup function to unsubscribe from the auth listener
    return unsubscribe;
  }, []);

  // Render a loading indicator if the app is still loading
  if (loading) {
    return null; // You can replace this with a loading spinner or similar component
  }

  // Main component rendering
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          // If there is a current user, render the HomeScreen
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        ) : (
          // If no user is logged in, render the LoginScreen
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};