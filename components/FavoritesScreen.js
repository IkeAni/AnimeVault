import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AnimeCard from './AnimeCard';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState([]);

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
            console.error('Virhe suosikkien hakemisessa:', error);
        }
    };

    const removeFavorite = async (animeId) => {
        try {
            const updatedFavorites = favorites.filter((anime) => anime.mal_id !== animeId);
            setFavorites(updatedFavorites);
            await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

            Alert.alert('Poistettu!', 'Anime poistettu suosikeista.');
        } catch (error) {
            console.error('Virhe suosikin poistamisessa:', error);
        }
    };

    if (favorites.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>Ei vielä suosikkeja lisättynä!</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={favorites}
                keyExtractor={(item, index) => item.mal_id.toString() + index.toString()}
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
        padding: 20,
        flex: 1,
    },
    emptyText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default FavoritesScreen;