// Main app-level navigation stack for authenticated users
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, DarkTheme, useNavigation } from '@react-navigation/native';
import { useColorScheme, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import AnimeSearch from '../components/AnimeSearch';
import AnimeDetailsScreen from '../components/AnimeDetailsScreen';
import MainTabNavigator from './MainTabNavigator';
import GenresScreen from '../components/GenresScreen';
import GenreAnimeListScreen from '../components/GenreAnimeListScreen';

const Stack = createNativeStackNavigator();

// Light and dark theme customization
const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f3e5f5',
        card: '#ffffff',
        text: '#222222',
        primary: '#222222',
    },
};

const CustomDarkTheme = {
    ...DarkTheme,
    colors: {
        ...DarkTheme.colors,
        background: '#121212',
        card: '#1e1e1e',
        text: '#ffffff',
        primary: '#ffffff',
    },
};

// Reusable search icon for headers
const HeaderIconsRight = ({ navigation }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginRight: 10 }}>
            <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
    </View>
);

const AppNavigator = () => {
    const colorScheme = useColorScheme();

    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={{
                headerStyle: { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#222222' },
                headerTintColor: '#fff',
                headerTitleAlign: 'center',
                headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
            }}
        >
            <Stack.Screen
                name="Main"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Search"
                component={AnimeSearch}
                options={{ title: 'Search Anime' }}
            />
            <Stack.Screen
                name="AnimeDetails"
                component={AnimeDetailsScreen}
                options={({ navigation }) => ({
                    title: 'Anime Details',
                    headerRight: () => <HeaderIconsRight navigation={navigation} />,
                })}
            />
            <Stack.Screen name="Genres" component={GenresScreen} options={{ title: 'Genres' }} />
            <Stack.Screen name="GenreAnimeList" component={GenreAnimeListScreen} options={({ route }) => ({
                title: route.params.genreName
            })} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
