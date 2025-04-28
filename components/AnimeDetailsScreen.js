import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimeDetailsScreen = ({ route }) => {
    const { animeId } = route.params;
    const [animeDetails, setAnimeDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { colors } = useTheme();

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            console.log('Fetching anime with ID:', animeId);
            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error: ${response.status}`);
                }
                const data = await response.json();
                setAnimeDetails(data.data);
                checkIfFavorite(data.data);
            } catch (error) {
                console.error('Error fetching anime details:', error);
            }
        };

        fetchAnimeDetails();
    }, [animeId]);

    const checkIfFavorite = async (anime) => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            const isFav = favorites.some((fav) => fav.mal_id === anime.mal_id);
            setIsFavorite(isFav);
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    const toggleFavorite = async () => {
        if (!animeDetails) return;

        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

            if (isFavorite) {
                const updatedFavorites = favorites.filter((fav) => fav.mal_id !== animeDetails.mal_id);
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                Alert.alert('Removed from Favorites', `${animeDetails.title} was removed.`);
                setIsFavorite(false);
            } else {
                const updatedFavorites = [...favorites, animeDetails];
                await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
                Alert.alert('Added to Favorites!', `${animeDetails.title} was added.`);
                setIsFavorite(true);
            }
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const openTrailer = () => {
        if (animeDetails?.trailer?.url) {
            Linking.openURL(animeDetails.trailer.url);
        } else {
            Alert.alert('No trailer available', 'Sorry, no trailer found for this anime.');
        }
    };

    if (!animeDetails) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.text }]}>Loading details...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={{ uri: animeDetails?.images?.jpg?.image_url }} style={styles.image} />
            <Text style={[styles.title, { color: colors.text }]}>{animeDetails.title}</Text>
            <Text style={[styles.description, { color: colors.text }]}>
                {animeDetails.synopsis || 'No description available.'}
            </Text>

            {/* Additional info */}
            <Text style={[styles.info, { color: colors.text }]}>Episodes: {animeDetails.episodes ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Status: {animeDetails.status ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Rating: {animeDetails.rating ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Release Year: {animeDetails.year ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Score: {animeDetails.score ?? 'N/A'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>
                Genres: {animeDetails.genres?.map((genre) => genre.name).join(', ') || 'Unknown'}
            </Text>

            {animeDetails?.trailer?.url && (
                <TouchableOpacity
                    style={[styles.trailerButton, { backgroundColor: colors.primary }]}
                    onPress={openTrailer}
                >
                    <Text style={styles.trailerButtonText}>Watch Trailer</Text>
                </TouchableOpacity>
            )}


            {/* Add/Remove Favorite Button */}
            <TouchableOpacity
                style={[styles.favoriteButton, { backgroundColor: colors.primary }]}
                onPress={toggleFavorite}
            >
                <Text style={styles.favoriteButtonText}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 15,
        marginBottom: 20,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 15,
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
    trailerButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    trailerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    favoriteButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AnimeDetailsScreen;
