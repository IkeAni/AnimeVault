import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import HomeScreen from '../components/HomeScreen';
import FavoritesScreen from '../components/FavoritesScreen';
import ProfileScreen from '../components/ProfileScreen';
import SettingsScreen from '../components/SettingsScreen';

const Tab = createBottomTabNavigator();

// Search icon for Home header only
const HeaderSearchIcon = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={{ marginRight: 15 }}>
            <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>
    );
};

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                tabBarStyle: { backgroundColor: '#222', height: 60 },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#aaa',
                tabBarIcon: ({ color, size }) => {
                    if (route.name === 'Home') return <Ionicons name="home" size={size} color={color} />;
                    if (route.name === 'Favorites') return <FontAwesome name="heart" size={size} color={color} />;
                    if (route.name === 'Profile') return <MaterialIcons name="person" size={size} color={color} />;
                    if (route.name === 'Settings') return <Ionicons name="settings" size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: true,
                    title: 'Anime Vault',
                    headerStyle: { backgroundColor: '#222' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
                    headerRight: () => <HeaderSearchIcon />,
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    headerShown: true,
                    title: 'My Favorites',
                    headerStyle: { backgroundColor: '#222' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: true,
                    title: 'Profile',
                    headerStyle: { backgroundColor: '#222' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    headerShown: true,
                    title: 'Settings',
                    headerStyle: { backgroundColor: '#222' },
                    headerTintColor: '#fff',
                    headerTitleAlign: 'center',
                    headerTitleStyle: { fontSize: 22, fontWeight: 'bold' },
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;