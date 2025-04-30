import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

import HomeScreen from '../components/HomeScreen';
import AnimeSearch from '../components/AnimeSearch';
import FavoritesScreen from '../components/FavoritesScreen';
import AnimeDetailsScreen from '../components/AnimeDetailsScreen';
import LoginScreen from '../components/LoginScreen';
import SignUpScreen from '../components/SignUpScreen';

const Stack = createNativeStackNavigator();

// Custom Light Theme
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

// Custom Dark Theme
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

// Header Left: Logout Icon
const HeaderIconsLeft = () => {
    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <View style={{ marginLeft: 15 }}>
            <TouchableOpacity onPress={handleLogout}>
                <MaterialIcons name="logout" size={26} color="#fff" />
            </TouchableOpacity>
        </View>
    );
};

// Header Right: Search + Favorites Icons
const HeaderIconsRight = ({ navigation }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
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
                    headerLeft: () => <HeaderIconsLeft />,
                    headerRight: () => <HeaderIconsRight navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="Search"
                component={AnimeSearch}
                options={({ navigation }) => ({
                    title: 'Search Anime',
                    headerRight: () => <HeaderIconsRight navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={({ navigation }) => ({
                    title: 'My Favorites',
                    headerRight: () => <HeaderIconsRight navigation={navigation} />,
                })}
            />
            <Stack.Screen
                name="AnimeDetails"
                component={AnimeDetailsScreen}
                options={({ navigation }) => ({
                    title: 'Anime Details',
                    headerRight: () => <HeaderIconsRight navigation={navigation} />,
                })}
            />
        </Stack.Navigator>
    );
};

export default AppNavigator;
