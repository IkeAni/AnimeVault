import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import AnimeCard from './AnimeCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // New import

const AnimeSearch = () => {
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);
  const navigation = useNavigation();

  const searchAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
      setAnimeList(response.data.data);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  const addFavorite = async (anime) => {
    try {
      const storedFavorites = await AsyncStorage.getItem('favorites');
      const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];

      const isAlreadyFavorite = favorites.some((fav) => fav.mal_id === anime.mal_id);
      if (isAlreadyFavorite) {
        Alert.alert('Notice', 'Anime is already in favorites.');
        return;
      }

      const updatedFavorites = [...favorites, anime];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));

      Alert.alert('Success!', `${anime.title} added to favorites.`);
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Show Favorites" onPress={() => navigation.navigate('Favorites')} />

      <TextInput
        placeholder="Search for anime..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Search" onPress={searchAnime} />

      <FlatList
        data={animeList}
        keyExtractor={(item, index) => item.mal_id.toString() + index.toString()}
        renderItem={({ item }) => (
          <AnimeCard
            title={item.title}
            animeId={item.mal_id}
            imageUrl={item.images.jpg.image_url}
            onAddFavorite={() => addFavorite(item)}
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
  input: {
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
});

export default AnimeSearch;
