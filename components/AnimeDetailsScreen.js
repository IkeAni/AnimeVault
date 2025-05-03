import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Linking,
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { db, auth } from '../firebase';
import { doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

const AnimeDetailsScreen = ({ route }) => {
    const { animeId } = route.params;
    const [animeDetails, setAnimeDetails] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { colors } = useTheme();
    const navigation = useNavigation();

    useEffect(() => {
        fetchAnimeDetails();
    }, [animeId]);

    const fetchAnimeDetails = async () => {
        try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
            if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

            const data = await response.json();
            setAnimeDetails(data.data);
            checkIfFavorite(data.data);
        } catch (error) {
            console.error('Error fetching anime details:', error);
        }
    };

    const checkIfFavorite = async (anime) => {
        try {
            const user = auth.currentUser;
            if (!user) return;
            const favoriteRef = doc(db, 'users', user.uid, 'favorites', anime.mal_id.toString());
            const docSnap = await getDoc(favoriteRef);
            setIsFavorite(docSnap.exists());
        } catch (error) {
            console.error('Error checking favorite status:', error);
        }
    };

    const toggleFavorite = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            const favoriteRef = doc(db, 'users', user.uid, 'favorites', animeDetails.mal_id.toString());

            if (isFavorite) {
                await deleteDoc(favoriteRef);
                Alert.alert('Removed from Favorites', `${animeDetails.title} was removed.`);
            } else {
                await setDoc(favoriteRef, {
                    title: animeDetails.title,
                    imageUrl: animeDetails.images.jpg.image_url,
                    mal_id: animeDetails.mal_id,
                });
                Alert.alert('Added to Favorites!', `${animeDetails.title} was added.`);
            }

            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error('Error toggling favorite:', error);
        }
    };

    const openTrailer = () => {
        if (animeDetails?.trailer?.url) {
            Linking.openURL(animeDetails.trailer.url);
        } else {
            Alert.alert('No trailer available');
        }
    };

    if (!animeDetails) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={[styles.loadingText, { color: colors.text }]}>Loading details...</Text>
            </View>
        );
    }

    return (
        <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
            <Image source={{ uri: animeDetails.images.jpg.image_url }} style={styles.image} />
            <Text style={[styles.title, { color: colors.text }]}>{animeDetails.title}</Text>
            <Text style={[styles.description, { color: colors.text }]}>
                {animeDetails.synopsis || 'No description available.'}
            </Text>

            <Text style={[styles.info, { color: colors.text }]}>Episodes: {animeDetails.episodes ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Status: {animeDetails.status ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Rating: {animeDetails.rating ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Release Year: {animeDetails.year ?? 'Unknown'}</Text>
            <Text style={[styles.info, { color: colors.text }]}>Score: {animeDetails.score ?? 'N/A'}</Text>

            <Text style={[styles.info, { color: colors.text }]}>Genres:</Text>
            <View style={styles.genresContainer}>
                {animeDetails.genres?.map((genre, index) => (
                    <TouchableOpacity
                        key={genre.mal_id}
                        onPress={() =>
                            navigation.navigate('GenreAnimeList', {
                                genreId: genre.mal_id,
                                genreName: genre.name,
                            })
                        }
                    >
                        <Text style={[styles.genreLink, { color: colors.primary }]}>
                            {genre.name}
                            {index < animeDetails.genres.length - 1 ? ', ' : ''}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {animeDetails?.trailer?.url && (
                <TouchableOpacity
                    style={[styles.trailerButton, { backgroundColor: colors.primary }]}
                    onPress={openTrailer}
                >
                    <Text style={styles.trailerButtonText}>Watch Trailer</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity
                style={[styles.favoriteButton, { backgroundColor: colors.primary }]}
                onPress={toggleFavorite}
            >
                <Text style={styles.favoriteButtonText}>
                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, fontSize: 16 },
    image: { width: '100%', height: 250, borderRadius: 15, marginBottom: 20 },
    title: { fontSize: 26, fontWeight: 'bold', marginBottom: 10 },
    description: { fontSize: 16, marginBottom: 15 },
    info: { fontSize: 16, marginBottom: 5 },
    genresContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    genreLink: {
        textDecorationLine: 'underline',
        marginRight: 8,
    },
    trailerButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    trailerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    favoriteButton: {
        marginTop: 20,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    favoriteButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AnimeDetailsScreen;
