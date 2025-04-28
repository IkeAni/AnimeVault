import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useTheme } from '@react-navigation/native';

const AnimeDetailsScreen = ({ route }) => {
    const { animeId } = route.params;
    const [animeDetails, setAnimeDetails] = useState(null);
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
            } catch (error) {
                console.error('Error fetching anime details:', error);
            }
        };

        fetchAnimeDetails();
    }, [animeId]);

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
            <Text style={[styles.description, { color: colors.text }]}>{animeDetails.synopsis || 'No description available.'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Release Year: {animeDetails.year || 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Score: {animeDetails.score ?? 'N/A'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>
                Genres: {animeDetails.genres?.map(genre => genre.name).join(', ') || 'Unknown'}
            </Text>
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
        backgroundColor: '#fff',
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
});

export default AnimeDetailsScreen;


