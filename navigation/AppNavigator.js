import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AnimeSearch from '../components/AnimeSearch';
import FavoritesScreen from '../components/FavoritesScreen'; // <-- uusi import

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Search">
                <Stack.Screen name="Search" component={AnimeSearch} options={{ title: 'Etsi Animeja' }} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} options={{ title: 'Suosikit' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;