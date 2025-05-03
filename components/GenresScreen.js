import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useNavigation, useTheme } from '@react-navigation/native';

const GenresScreen = () => {
    const [genres, setGenres] = useState([]); // Store list of anime genres
    const [loading, setLoading] = useState(true); // Loading state while fetching
    const { colors } = useTheme(); // For theme-based coloring
    const navigation = useNavigation(); // Navigation hook for screen transitions

    // Fetch genres from Jikan API when screen mounts
    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const res = await axios.get('https://api.jikan.moe/v4/genres/anime');
                setGenres(res.data.data); // Set genres list
            } catch (err) {
                console.error('Error fetching genres:', err);
            } finally {
                setLoading(false); // Hide loader after API call finishes
            }
        };
        fetchGenres();
    }, []);

    // Show loader while genres are being fetched
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        );
    }

    // Display genre boxes as a grid
    return (
        <FlatList
            contentContainerStyle={styles.list}
            data={genres}
            keyExtractor={(item) => item.mal_id.toString()}
            numColumns={2} // Show genres in 2 columns
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={[styles.genreBox, { backgroundColor: colors.card }]}
                    onPress={() =>
                        navigation.navigate('GenreAnimeList', { genreId: item.mal_id, genreName: item.name })
                    }
                >
                    <Text style={[styles.genreText, { color: colors.text }]}>{item.name}</Text>
                </TouchableOpacity>
            )}
        />
    );
};


const styles = StyleSheet.create({
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    list: { padding: 20 },
    genreBox: {
        flex: 1,
        padding: 20,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3,
    },
    genreText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default GenresScreen;
