import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable'; // for fade-in animation

const AnimeCard = ({ title, imageUrl, onAddFavorite, onRemoveFavorite, isFavoriteScreen, animeId }) => {
    const navigation = useNavigation();
    const { colors } = useTheme();

    return (
        <Animatable.View animation="fadeInUp" duration={500} style={[styles.card, { backgroundColor: colors.card }]}>
            <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => {
                    if (animeId) {
                        navigation.navigate('AnimeDetails', { animeId });
                    } else {
                        console.warn('No animeId provided, navigation cancelled.');
                    }
                }}
            >
                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={isFavoriteScreen ? onRemoveFavorite : onAddFavorite}
            >
                <Text style={styles.buttonText}>
                    {isFavoriteScreen ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>
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

