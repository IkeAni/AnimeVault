import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

const LoginScreen = () => {
    const { colors } = useTheme(); // Use theme for light/dark mode styling
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Optional listener in case we want to track auth state changes
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, () => { });
        return unsubscribe;
    }, []);

    // Attempt login using Firebase Auth
    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            // Navigation to Home happens automatically in AppEntryNavigator when auth state updates
        } catch (error) {
            Alert.alert('Login Error', error.message);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Login to AnimeVault</Text>

            {/* Email Input */}
            <TextInput
                placeholder="Email"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
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

            {/* Login Button */}
            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={handleLogin}
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Navigate to Sign Up screen */}
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={[styles.link, { color: colors.primary }]}>
                    Don't have an account? Sign Up
                </Text>
            </TouchableOpacity>
        </View>
    );
};

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

export default LoginScreen;

