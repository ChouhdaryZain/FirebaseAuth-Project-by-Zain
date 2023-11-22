import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import { useState, useEffect } from 'react';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';



export default function App() {
  const Stack = createNativeStackNavigator();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe; // Unsubscribe on unmount
  }, []);

  if (loading) {
    return null; // or a loading indicator
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {currentUser ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        ) : (
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
