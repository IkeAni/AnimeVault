import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import AnimeSearch from '../components/AnimeSearch';
import FavoritesScreen from '../components/FavoritesScreen';
import AnimeDetailsScreen from '../components/AnimeDetailsScreen';
import HomeScreen from '../components/HomeScreen';

const Stack = createNativeStackNavigator();

// Custom light theme
const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: '#f3e5f5',
        card: '#ffffff',
        text: '#222222',
        primary: '#222222', // soft black
    },
};

// Custom dark theme
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

const AppNavigator = () => {
    const colorScheme = useColorScheme(); // detects dark/light mode

    return (
        <NavigationContainer theme={colorScheme === 'dark' ? CustomDarkTheme : LightTheme}>
            <Stack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerStyle: { backgroundColor: colorScheme === 'dark' ? '#1e1e1e' : '#222222' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
                }}
            >
                <Stack.Screen
                    name="Home"
                    component={HomeScreen}
                    options={({ navigation }) => ({
                        title: 'Anime Vault',
                        headerRight: () => (
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginRight: 20 }}>
                                    <Ionicons name="search" size={24} color="#fff" />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ marginRight: 10 }}>
                                    <FontAwesome name="heart" size={24} color="#fff" />
                                </TouchableOpacity>
                            </View>
                        ),
                    })}
                />

                <Stack.Screen
                    name="Search"
                    component={AnimeSearch}
                    options={{ title: 'Search Anime' }}
                />

                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={{ title: 'My Favorites' }}
                />

                <Stack.Screen
                    name="AnimeDetails"
                    component={AnimeDetailsScreen}
                    options={{ title: 'Anime Details' }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;