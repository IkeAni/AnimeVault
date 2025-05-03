import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { useTheme } from '@react-navigation/native';

// This screen displays a list of anime filtered by a selected genre
const GenreAnimeListScreen = ({ route }) => {
    const { genreId, genreName } = route.params; // Genre data passed from previous screen
    const [animeList, setAnimeList] = useState([]); // Stores list of anime from API
    const [loading, setLoading] = useState(true);   // Tracks loading state
    const { colors } = useTheme(); // Dynamically apply theme colors

    // Fetch anime by genre whenever the genreId changes
    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const res = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}`);
                setAnimeList(res.data.data); // Set anime results
            } catch (err) {
                console.error('Error fetching anime by genre:', err);
            } finally {
                setLoading(false); // Hide loader once done
            }
        };
        fetchAnime();
    }, [genreId]);

    // Show loading indicator while waiting for API response
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    // Render anime list using FlatList for performance
    return (
        <FlatList
            contentContainerStyle={{ padding: 20 }}
            data={animeList}
            keyExtractor={(item) => item.mal_id.toString()}
            renderItem={({ item }) => (
                <AnimeCard
                    title={item.title}
                    animeId={item.mal_id}
                    imageUrl={item.images.jpg.image_url}
                />
            )}
            // Optional title at the top of the list to show current genre
            ListHeaderComponent={
                <Text style={[styles.title, { color: colors.text }]}>
                    {genreName} Anime
                </Text>
            }
        />
    );
};


const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
});

export default GenreAnimeListScreen;
