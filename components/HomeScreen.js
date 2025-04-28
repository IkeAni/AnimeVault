import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, FlatList, ActivityIndicator } from 'react-native';
import { useNavigation, useTheme } from '@react-navigation/native';
import axios from 'axios';
import * as Animatable from 'react-native-animatable';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { colors } = useTheme();
    const [featuredAnime, setFeaturedAnime] = useState(null);
    const [topAnimeList, setTopAnimeList] = useState([]);
    const [loadingFeatured, setLoadingFeatured] = useState(true);
    const [loadingTop, setLoadingTop] = useState(true);

    useEffect(() => {
        fetchFeaturedAnime();
        fetchTopAnime();
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
            setLoadingFeatured(false);
        }
    };

    const fetchTopAnime = async () => {
        try {
            const response = await axios.get('https://api.jikan.moe/v4/top/anime?limit=20');
            setTopAnimeList(response.data.data);
        } catch (error) {
            console.error('Error fetching top anime:', error);
        } finally {
            setLoadingTop(false);
        }
    };

    const renderTopAnimeItem = ({ item }) => (
        <TouchableOpacity
            style={styles.topAnimeItem}
            onPress={() => navigation.navigate('AnimeDetails', { animeId: item.mal_id })}
        >
            <Image
                source={{ uri: item.images.jpg.image_url }}
                style={styles.topAnimeImage}
            />
            <Text style={[styles.topAnimeTitle, { color: colors.text }]} numberOfLines={2}>
                {item.title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
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
                {loadingFeatured ? (
                    <ActivityIndicator size="large" color={colors.primary} />
                ) : featuredAnime ? (
                    <>
                        <Text style={[styles.featuredTitle, { color: colors.text }]}>Featured Anime</Text>
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

            {/* Trending Anime Section */}
            <View style={{ marginTop: 30 }}>
                <Text style={[styles.topAnimeHeading, { color: colors.text }]}>Top Trending Anime</Text>

                {loadingTop ? (
                    <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 10 }} />
                ) : (
                    <Animatable.View animation="fadeInUp" duration={800}>
                        <FlatList
                            data={topAnimeList}
                            keyExtractor={(item) => item.mal_id.toString()}
                            renderItem={renderTopAnimeItem}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 10 }}
                        />
                    </Animatable.View>
                )}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 40,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        paddingVertical: 15,
        borderRadius: 10,
        alignSelf: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    featuredContainer: {
        marginTop: 20,
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
    topAnimeHeading: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    topAnimeItem: {
        marginRight: 15,
        alignItems: 'center',
        width: 120,
    },
    topAnimeImage: {
        width: 100,
        height: 140,
        borderRadius: 10,
        marginBottom: 5,
    },
    topAnimeTitle: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default HomeScreen;


