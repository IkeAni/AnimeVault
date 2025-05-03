import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { useTheme } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

// List of genres to use for quick filtering
const genresList = [
  { id: 1, name: 'Action' },
  { id: 4, name: 'Comedy' },
  { id: 8, name: 'Drama' },
  { id: 10, name: 'Fantasy' },
  { id: 14, name: 'Horror' },
  { id: 22, name: 'Romance' },
  { id: 24, name: 'Sci-Fi' },
  { id: 37, name: 'Supernatural' },
  { id: 30, name: 'Sports' },
];

const AnimeSearch = () => {
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const { colors } = useTheme();

  // Trigger genre search when a genre is selected
  useEffect(() => {
    if (selectedGenre !== null) {
      fetchByGenre(selectedGenre);
    }
  }, [selectedGenre]);

  // Searches anime based on user input query
  const searchAnime = async () => {
    if (!query.trim()) return;
    setSelectedGenre(null); // Clear selected genre if doing a keyword search

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

  // Fetch anime by selected genre
  const fetchByGenre = async (genreId) => {
    try {
      setLoading(true);
      const res = await axios.get(`https://api.jikan.moe/v4/anime?genres=${genreId}&limit=10`);
      setAnimeList(res.data.data);
    } catch (err) {
      console.error('Error fetching genre anime:', err);
    } finally {
      setLoading(false);
    }
  };

  // Adds selected anime to Firestore favorites under current user
  const addFavorite = async (anime) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        alert('You must be logged in.');
        return;
      }

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
      {/* Input for searching anime */}
      <TextInput
        placeholder="Search anime..."
        placeholderTextColor="#888"
        value={query}
        onChangeText={setQuery}
        style={[styles.input, { color: colors.text, borderColor: colors.primary }]}
        onSubmitEditing={searchAnime}
        returnKeyType="search"
      />

      {/* Horizontal scroll list of genre filters */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.genreScroll}>
        {genresList.map((genre) => (
          <TouchableOpacity
            key={genre.id}
            style={[
              styles.genreButton,
              {
                backgroundColor: selectedGenre === genre.id ? colors.primary : '#ccc',
              },
            ]}
            onPress={() => setSelectedGenre(genre.id)}
          >
            <Text
              style={{
                color: selectedGenre === genre.id ? '#fff' : '#000',
                fontWeight: 'bold',
              }}
            >
              {genre.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Loading indicator while fetching */}
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
          ListEmptyComponent={
            !loading && (
              <Text style={[styles.emptyText, { color: colors.text }]}>
                {query || selectedGenre ? 'No anime found.' : 'Search or choose a genre'}
              </Text>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },

  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 16,
  },

  genreButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  genreScroll: {
    marginBottom: 12,
    maxHeight: 40,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
});

export default AnimeSearch;
