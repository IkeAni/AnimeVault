import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useTheme, useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import AnimeCard from './AnimeCard';
import { db, auth } from '../firebase';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';

const FavoritesScreen = () => {
    const [favorites, setFavorites] = useState([]);
    const { colors } = useTheme();

    // This hook ensures favorites are fetched every time this screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchFavorites();
        }, [])
    );

    // Fetch favorites from Firestore for the logged-in user
    const fetchFavorites = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const favoritesRef = collection(db, 'users', user.uid, 'favorites');
            const snapshot = await getDocs(favoritesRef);

            // Map each document to a favorite item
            const fetchedFavorites = snapshot.docs.map(doc => doc.data());
            setFavorites(fetchedFavorites);
        } catch (error) {
            console.error('Error fetching favorites:', error);
        }
    };

    // Remove a favorite by its mal_id and refresh the list
    const removeFavorite = async (animeId) => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const favoriteRef = doc(db, 'users', user.uid, 'favorites', animeId.toString());
            await deleteDoc(favoriteRef);

            fetchFavorites(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error removing favorite:', error);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            {favorites.length === 0 ? (
                <Text style={[styles.emptyText, { color: colors.text }]}>
                    You haven't added any favorites yet.
                </Text>
            ) : (
                <FlatList
                    data={favorites}
                    keyExtractor={(item) => item.mal_id.toString()}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <AnimeCard
                            title={item.title}
                            imageUrl={item.imageUrl}
                            animeId={item.mal_id}
                            isFavoriteScreen={true}
                            onRemoveFavorite={() => removeFavorite(item.mal_id)}
                        />
                    )}
                />
            )}
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    emptyText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
    },
});

export default FavoritesScreen;