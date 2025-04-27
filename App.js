import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AnimeSearch from './components/AnimeSearch';
import FavoritesScreen from './components/FavoritesScreen';
import AnimeDetailsScreen from './components/AnimeDetailsScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AnimeSearch">
        <Stack.Screen name="AnimeSearch" component={AnimeSearch} />
        <Stack.Screen name="Favorites" component={FavoritesScreen} />
        <Stack.Screen name="AnimeDetails" component={AnimeDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
