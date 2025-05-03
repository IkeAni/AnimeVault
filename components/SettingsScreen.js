import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Switch } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { ThemeContext } from '../context/ThemeContext';
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

const SettingsScreen = () => {
    const { colors } = useTheme(); // Get current theme colors from navigation
    const { isDark, toggleTheme } = useContext(ThemeContext); // Custom context for theme toggle

    // Clears all user's favorite anime from Firestore
    const clearFavorites = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const favRef = collection(db, 'users', user.uid, 'favorites');
            const favSnap = await getDocs(favRef);

            const promises = favSnap.docs.map((docSnap) =>
                deleteDoc(doc(db, 'users', user.uid, 'favorites', docSnap.id))
            );

            await Promise.all(promises);
            Alert.alert('Favorites cleared');
        } catch (error) {
            console.error('Error clearing favorites:', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>

            {/* Button to clear all favorited anime from Firestore */}
            <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={clearFavorites}>
                <Text style={styles.buttonText}>Clear All Favorites</Text>
            </TouchableOpacity>

            {/* Toggle switch for dark/light theme */}
            <View style={styles.themeRow}>
                <Text style={[styles.label, { color: colors.text }]}>Dark Mode</Text>
                <Switch value={isDark} onValueChange={toggleTheme} />
            </View>

            {/* Static about section */}
            <View style={{ marginTop: 30 }}>
                <Text style={[styles.aboutText, { color: colors.text }]}>
                    AnimeVault v1.0{'\n'}Built with ❤️ using React Native + Firebase.
                </Text>
            </View>
        </View>
    );
};

// Styles for layout and elements
const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    button: { padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 20 },
    buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
    themeRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    label: { fontSize: 16 },
    aboutText: { fontSize: 14, textAlign: 'center', lineHeight: 22 }
});

export default SettingsScreen;
