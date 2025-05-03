import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

// Reusable card component for displaying an anime item
const AnimeCard = ({ title, imageUrl, onAddFavorite, onRemoveFavorite, isFavoriteScreen, animeId }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        // Animatable view for fade-in effect on render
        <Animatable.View animation="fadeInUp" duration={500} style={[styles.card, { backgroundColor: colors.card }]}>
            {/* Navigate to AnimeDetails screen when image/title is pressed */}
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => {
                    if (animeId) {
                        navigation.navigate('AnimeDetails', { animeId });
                    }
                }}
            >
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            </TouchableOpacity>

            {/* Conditionally show "Add to Favorites" if not on the Favorites screen */}
            {onAddFavorite && !isFavoriteScreen && (
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onAddFavorite}>
                    <Text style={styles.buttonText}>Add to Favorites</Text>
                </TouchableOpacity>
            )}

            {/* Conditionally show "Remove" if on the Favorites screen */}
            {onRemoveFavorite && isFavoriteScreen && (
                <TouchableOpacity style={[styles.button, { backgroundColor: colors.primary }]} onPress={onRemoveFavorite}>
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
            )}
        </Animatable.View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    image: {
        width: 140,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    button: {
        marginTop: 8,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default AnimeCard;

