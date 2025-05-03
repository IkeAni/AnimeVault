import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

const ProfileScreen = () => {
    const { colors } = useTheme(); // Pull in current theme colors
    const [userData, setUserData] = useState(null); // User profile data from Firestore
    const [loading, setLoading] = useState(true); // Loading state for profile fetch

    // Fetch user profile data from Firestore on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const docRef = doc(db, 'users', auth.currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                }
            } catch (err) {
                console.error('Failed to load user data', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Logout current user from Firebase Auth
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            Alert.alert('Logout failed', error.message);
        }
    };

    // Show loading spinner while fetching profile
    if (loading) {
        return (
            <View style={[styles.center, { backgroundColor: colors.background }]}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {/* Display user's username and email */}
            <Text style={[styles.label, { color: colors.text }]}>Username:</Text>
            <Text style={[styles.value, { color: colors.text }]}>{userData?.username || 'N/A'}</Text>

            <Text style={[styles.label, { color: colors.text }]}>Email:</Text>
            <Text style={[styles.value, { color: colors.text }]}>{userData?.email || 'N/A'}</Text>

            {/* Logout button */}
            <TouchableOpacity
                style={[styles.logoutButton, { backgroundColor: colors.primary }]}
                onPress={handleLogout}
            >
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginTop: 20,
    },
    value: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    logoutButton: {
        marginTop: 40,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;

