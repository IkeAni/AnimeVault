import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';

const AnimeDetailsScreen = ({ route }) => {
    const { animeId } = route.params; // Saamme animeId:n navigoinnin kautta
    const [animeDetails, setAnimeDetails] = useState(null);

    useEffect(() => {
        const fetchAnimeDetails = async () => {
            console.log('Haetaan anime ID:llä', animeId); // <-- Lisätty debug
            console.log('Saapunut animeId:', animeId);


            try {
                const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
                console.log('Response status:', response.status); // <-- Lisätty debug

                if (!response.ok) {
                    throw new Error(`HTTP virhe: ${response.status}`);
                }

                const data = await response.json();
                console.log('Haettu data:', data); // <-- Lisätty debug

                setAnimeDetails(data.data);
            } catch (error) {
                console.error('Virhe haettaessa anime-tietoja:', error);
            }
        };

        fetchAnimeDetails();
    }, [animeId]);

    if (!animeDetails) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
                <Text>Ladataan tietoja...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: animeDetails?.images?.jpg?.image_url }} style={styles.image} />
            <Text style={styles.title}>{animeDetails.title}</Text>
            <Text style={styles.description}>{animeDetails.synopsis}</Text>
            <Text style={styles.info}>Julkaisuvuosi: {animeDetails.year}</Text>
            <Text style={styles.info}>Arvosana: {animeDetails.score}</Text>
            <Text style={styles.info}>Tyylilajit: {animeDetails.genres.map(genre => genre.name).join(', ')}</Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
        color: '#555',
    },
    info: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default AnimeDetailsScreen;
