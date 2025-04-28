import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnimeSearch = () => {
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { colors } = useTheme();

  const searchAnime = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);

      const uniqueAnimeList = Array.from(
        new Map(response.data.data.map(item => [item.mal_id, item])).values()
      );

      setAnimeList(uniqueAnimeList);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (anime) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const isAlreadyFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);
      if (isAlreadyFavorite) {
        alert('Anime is already in favorites.');
        return;
      }

      const updatedFavorites = [...favorites, anime];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      alert(`${anime.title} added to favorites!`);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <TextInput
        placeholder="Search anime..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
        onSubmitEditing={searchAnime}
        returnKeyType="search"
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={animeList}
          keyExtractor={(item) => item.mal_id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <AnimeCard
              title={item.title}
              imageUrl={item.images.jpg.image_url}
              animeId={item.mal_id}
              onAddFavorite={() => addFavorite(item)}
            />
          )}
          ListEmptyComponent={!loading && (
            <Text style={[styles.emptyText, { color: colors.text }]}>
              {query ? 'No anime found.' : 'Start searching for anime!'
              }
            </Text>
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
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});

export default AnimeSearch;