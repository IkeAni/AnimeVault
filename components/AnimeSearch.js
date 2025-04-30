import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet, ActivityIndicator, Text, Alert } from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { useTheme } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

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
      const uniqueAnimeList = Array.from(new Map(response.data.data.map(item => [item.mal_id, item])).values());
      setAnimeList(uniqueAnimeList);
    } catch (error) {
      console.error('Error fetching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const addFavorite = async (anime) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in.');
        return;
      }

      console.log('Saving anime to favorites:', anime);

      const favoriteRef = doc(db, 'users', user.uid, 'favorites', anime.mal_id.toString());

      await setDoc(favoriteRef, {
        title: anime.title || anime.titles?.[0]?.title || 'Unknown Title',
        imageUrl: anime.images?.jpg?.image_url || '',
        mal_id: anime.mal_id,
      });

      Alert.alert(`${anime.title} added to favorites!`);
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
              {query ? 'No anime found.' : 'Start searching for anime!'}
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
