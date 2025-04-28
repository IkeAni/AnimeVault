import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimeCard from './AnimeCard';
import { useTheme } from '@react-navigation/native';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const { colors } = useTheme();

    useEffect(() => {
        fetchFavorites();
    }, []);

    const fetchFavorites = async () => {
        try {
            const storedFavorites = await AsyncStorage.getItem('favorites');
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites));
            }
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    const removeFavorite = async (animeId) => {
        try {
            const updatedFavorites = favorites.filter((anime) => anime.mal_id !== animeId);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
            alert('Anime removed from favorites!');
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    if (favorites.length === 0) {
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <Text style={[styles.emptyText, { color: colors.text }]}>
                    You haven't added any favorites yet.
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.mal_id.toString()}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <AnimeCard
                        title={item.title}
                        imageUrl={item.images.jpg.image_url}
                        animeId={item.mal_id}
                        isFavoriteScreen={true}
                        onRemoveFavorite={() => removeFavorite(item.mal_id)}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavoritesScreen;

