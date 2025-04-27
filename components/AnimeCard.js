import React from 'react';
import { View, Text, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Tuodaan navigointi

const AnimeCard = ({ title, imageUrl, onAddFavorite, onRemoveFavorite, isFavoriteScreen, animeId }) => {
    const navigation = useNavigation(); // Käytämme useNavigation hookia

    return (
        <View style={styles.card}>
            <TouchableOpacity
                onPress={() => {
                    if (animeId) {
                        navigation.navigate('AnimeDetails', { animeId });
                    } else {
                        console.warn('Ei animeId:tä, navigointia ei suoriteta.');
                    }
                }}
            >

                <Image source={{ uri: imageUrl }} style={styles.image} />
                <Text style={styles.title}>{title}</Text>
            </TouchableOpacity>

            {isFavoriteScreen ? (
                <Button title="Poista suosikista" onPress={onRemoveFavorite} />
            ) : (
                <Button title="Lisää suosikiksi" onPress={onAddFavorite} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 120,
        height: 180,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 8,
    },
});

export default AnimeCard;