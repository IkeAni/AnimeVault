import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import axios from 'axios';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [featuredAnime, setFeaturedAnime] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchFeaturedAnime();
    }, []);

    const fetchFeaturedAnime = async () => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/top/anime?limit=10');
            const topAnime = response.data.data;
            const randomAnime = topAnime[Math.floor(Math.random() * topAnime.length)];
            setFeaturedAnime(randomAnime);
        } catch (error) {
            console.error('Error fetching featured anime:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.title, { color: colors.text }]}>Anime Vault</Text>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('Search')}
            >
                <Text style={styles.buttonText}>Search Anime</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => navigation.navigate('Favorites')}
            >
                <Text style={styles.buttonText}>View Favorites</Text>
            </TouchableOpacity>

            <View style={styles.featuredContainer}>
                {loading ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : featuredAnime ? (
                    <>
                        <Text style={[styles.featuredTitle, { color: colors.text }]}>
                            Featured Anime
                        </Text>
                        <Image
                            source={{ uri: featuredAnime.images.jpg.image_url }}
                            style={styles.featuredImage}
                        />
                        <Text style={[styles.featuredName, { color: colors.text }]}>
                            {featuredAnime.title}
                        </Text>

                        <TouchableOpacity
                            style={[styles.detailsButton, { backgroundColor: colors.primary }]}
                            onPress={() => navigation.navigate('AnimeDetails', { animeId: featuredAnime.mal_id })}
                        >
                            <Text style={styles.detailsButtonText}>View Details</Text>
                        </TouchableOpacity>
                    </>
                ) : (
                    <Text style={[styles.featuredTitle, { color: colors.text }]}>
                        No featured anime available
                    </Text>
                )}

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    featuredContainer: {
        marginTop: 30,
        alignItems: 'center',
    },
    featuredTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    featuredImage: {
        width: 200,
        height: 280,
        borderRadius: 12,
        marginBottom: 10,
    },
    featuredName: {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    detailsButton: {
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
    },
    detailsButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },

});

export default HomeScreen;

