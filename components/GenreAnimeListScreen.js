import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { useTheme } from '@react-navigation/native';

const GenreAnimeListScreen = ({ route }) => {
    const { genreId, genreName } = route.params;
    const [animeList, setAnimeList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { colors } = useTheme();

    useEffect(() => {
        const fetchAnime = async () => {
            try {
                const res = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}`);
                setAnimeList(res.data.data);
            } catch (err) {
                console.error('Error fetching anime by genre:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAnime();
    }, [genreId]);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

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
