import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons'; // icons
import AnimeSearch from '../components/AnimeSearch';
import FavoritesScreen from '../components/FavoritesScreen';
import AnimeDetailsScreen from '../components/AnimeDetailsScreen';
import HomeScreen from '../components/HomeScreen';

const Stack = createNativeStackNavigator();

// Custom themes
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

// Common Header Right Icons
const HeaderIcons = ({ navigation }) => (
    <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginRight: 20 }}>
            <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={{ marginRight: 10 }}>
            <FontAwesome name="heart" size={24} color="#fff" />
        </TouchableOpacity>
    </View>
);

const AppNavigator = () => {
    const colorScheme = useColorScheme();

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
                        headerRight: () => <HeaderIcons navigation={navigation} />,
                    })}
                />

                <Stack.Screen
                    name="Search"
                    component={AnimeSearch}
                    options={({ navigation }) => ({
                        title: 'Search Anime',
                        headerRight: () => <HeaderIcons navigation={navigation} />,
                    })}
                />

                <Stack.Screen
                    name="Favorites"
                    component={FavoritesScreen}
                    options={({ navigation }) => ({
                        title: 'My Favorites',
                        headerRight: () => <HeaderIcons navigation={navigation} />,
                    })}
                />

                <Stack.Screen
                    name="AnimeDetails"
                    component={AnimeDetailsScreen}
                    options={({ navigation }) => ({
                        title: 'Anime Details',
                        headerRight: () => <HeaderIcons navigation={navigation} />,
                    })}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
