// Importing necessary components and hooks from React, React Native, Firebase, and other libraries
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Importing the Firebase auth object
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    // State hooks for managing email and password inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Hook for navigation
    const navigation = useNavigation();

    // useEffect hook to monitor the authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // Automatically navigate to the Home screen if the user is logged in
            if (user) {
                navigation.navigate("Home");
            }
        });

        // Cleanup function to unsubscribe from the auth listener
        return unsubscribe;
    }, []);

    // Function to handle user signup
    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("User created:", user.email, password); // Logging the email and password
            })
            .catch(error => {
                console.error("Signup error:", error.message); // Logging any signup errors
            });
    };

    // Function to handle user login
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("User logged in:", user.email); // Logging the email of the logged-in user
            })
            .catch(error => {
                console.error("Login error:", error.message); // Logging any login errors
            });
    };

    // Rendering the login screen UI
    return (
        <View style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
        }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding' // Using 'padding' behavior for KeyboardAvoidingView
            >
                <View style={styles.logo}>
                    <MaterialCommunityIcons name="login-variant" size={60} color="black" />
                </View>
                <Text style={styles.loginText}>Login / Register</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Email'
                        value={email}
                        onChangeText={text => setEmail(text)}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    />
                </View>
                <View style={styles.buttonContanier}>
                    <TouchableOpacity
                        onPress={handleLogin}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleSignup}
                        style={[styles.button, styles.buttonOutline]}
                    >
                        <Text style={styles.buttonOutlineText}>Register</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default LoginScreen;

// Styles for the LoginScreen component
const styles = StyleSheet.create({
    // Container style
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    // Style for the logo
    logo: {
        marginBottom: 60,
        alignItems: "center",
    },
    // Style for the login text
    loginText: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: "700",
    },
    // Style for input container
    inputContainer: {
        width: "80%",
    },
    // Style for input fields
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    // Style for button container
    buttonContanier: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    // Style for button
    button: {
        width: "100%",
        backgroundColor: "#0782F9",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    // Text style for button
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    // Style for outline button
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    // Text style for outline button
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
});
