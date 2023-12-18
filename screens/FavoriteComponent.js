import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const FavoriteComponent = ({ thumbnail, price, details }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: thumbnail }} style={styles.thumbnail} />
      <View style={styles.detailsContainer}>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.details}>{details}</Text>
      </View>
      <TouchableOpacity onPress={handleToggleFavorite} style={styles.favoriteButton}>
        <Icon name={isFavorite ? 'heart' : 'heart-o'} size={20} color={isFavorite ? 'red' : 'black'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 10,
    marginBottom: 8,
  },
  thumbnail: {
    width: 50,
    height: 50,
    resizeMode: 'cover',
    marginRight: 8,
  },
  detailsContainer: {
    flex: 1,
    marginRight: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#555',
  },
  favoriteButton: {
    padding: 8,
  },
});

export default FavoriteComponent;
