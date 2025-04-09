import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image } from 'react-native';
import axios from 'axios';

const AnimeSearch = () => {
  const [query, setQuery] = useState('');
  const [animeList, setAnimeList] = useState([]);

  const searchAnime = async () => {
    try {
      const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&limit=10`);
      setAnimeList(response.data.data);
    } catch (error) {
      console.error('Virhe haettaessa animeja:', error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Etsi anime..."
        value={query}
        onChangeText={setQuery}
        style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
      />
      <Button title="Hae" onPress={searchAnime} />
      
      <FlatList
        data={animeList}
        keyExtractor={(item) => item.mal_id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Image source={{ uri: item.images.jpg.image_url }} style={{ width: 100, height: 150 }} />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default AnimeSearch;