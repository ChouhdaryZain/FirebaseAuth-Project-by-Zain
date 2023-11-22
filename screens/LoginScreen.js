import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'react-native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigation  = useNavigation()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user=> {
            if(user){[
                navigation.navigate("Home")
            ]}
        })
        return unsubscribe
    }, []);


    const handleSignup = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("User created:", user.email, password);
            })
            .catch(error => {
                console.error("Signup error:", error.message);
            });
    };
    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log("User logged in:", user.email);
            })
            .catch(error => {
                console.error("Login error:", error.message);
            });
    };
    return (
        <View style={{
            flex: 1,
            marginTop: StatusBar.currentHeight,
        }}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior='padding'
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
                    >
                    </TextInput>
                    <TextInput
                        placeholder='Password'
                        value={password}
                        onChangeText={text => setPassword(text)}
                        style={styles.input}
                        secureTextEntry
                    >
                    </TextInput>
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

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        marginBottom: 60,
        // justifyContent: "center",
        alignItems: "center",
    },
    loginText: {
        marginBottom: 20,
        fontSize: 25,
        fontWeight: "700",
    },
    inputContainer: {
        width: "80%",
    },
    input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    buttonContanier: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
    },
    button: {
        width: "100%",
        backgroundColor: "#0782F9",
        padding: 15,
        borderRadius: 10,
        // marginTop: 5,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
    },
    buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#0782F9",
        borderWidth: 2,
    },
    buttonOutlineText: {
        color: "#0782F9",
        fontWeight: "700",
        fontSize: 16,
    },
})