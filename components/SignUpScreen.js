import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

const SignUpScreen = () => {
    const { colors } = useTheme(); // Access current theme colors
    const navigation = useNavigation(); // Navigation hook

    // Form field states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    // Handles sign-up logic with Firebase Auth & Firestore
    const handleSignUp = async () => {
        if (!email || !password || !username) {
            Alert.alert('Missing Fields', 'Please fill in all fields.');
            return;
        }

        try {
            // Create user with email & password in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Store user profile info in Firestore
            await setDoc(doc(db, 'users', user.uid), {
                email: user.email,
                username,
                createdAt: new Date().toISOString(),
            });

            Alert.alert('Account created!', 'You can now log in.');
        } catch (error) {
            Alert.alert('Sign Up Error', error.message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Create an Account</Text>

            {/* Username Input */}
            <TextInput
                placeholder="Username"
                placeholderTextColor="#999"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
                style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
            />

            {/* Email Input */}
            <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
            />

            {/* Password Input */}
            <TextInput
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={[styles.input, { borderColor: colors.primary, color: colors.text }]}
            />

            {/* Sign Up Button */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            {/* Link to Login Screen */}
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={[styles.link, { color: colors.primary }]}>
                    Already have an account? Log In
                </Text>
            </TouchableOpacity>
        </View>
    );
};

// Basic styling
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        padding: 12,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    button: {
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    link: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 15,
    },
});

export default SignUpScreen;
