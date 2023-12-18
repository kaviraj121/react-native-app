// screens/ProductDetailsScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome5 icon from react-native-vector-icons
import axios from 'axios';
import { useCart } from '../CartContext'; 
import { useFavorites } from '../FavoritesContext';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { productId } = route.params;
  const { cart, addToCart } = useCart();
  const [productDetails, setProductDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();


  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      setProductDetails(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    // Implement the logic to add the product to the cart
    if (productDetails) {
      addToCart({ ...productDetails, quantity: 1 });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };

  if (loading) {
    return (
      <View>
        {/* Loading indicator */}
      </View>
    );
  }



  const handleAddToFavorites = () => {
    if (productDetails) {
      addToFavorites(productDetails);
      console.log('Adding to favorites:', productDetails);
    }
  };

  const handleRemoveFromFavorites = () => {
    if (productDetails) {
      removeFromFavorites(productDetails.id);
    }
  };

  const isProductInFavorites = favorites.some((item) => item.id === productDetails.id);

  if (loading) {
    return (
      <View>
        {/* Loading indicator */}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {productDetails.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.productImage} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{productDetails.title}</Text>
        <Text style={styles.price}>${productDetails.price}</Text>
        <Text style={styles.description}>{productDetails.description}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity
  style={styles.button}
  onPress={isProductInFavorites ? handleRemoveFromFavorites : handleAddToFavorites}
>
  {/* Use "FontAwesome5Free-Solid" for filled heart and "FontAwesome5Free-Regular" for outlined heart */}
  <Icon
    name={isProductInFavorites ? 'heart' : 'heart-o'}
    size={20}
    color={isProductInFavorites ? '#FF5E5B' : '#000'}
  />
</TouchableOpacity>
      </View>

      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={24} color="#333" />
      </TouchableOpacity> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    height: 300,
  },
  productImage: {
    width: 400 ,
    height: 300,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#555',
    marginBottom: 16,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    zIndex: 1,
  },
});

export default ProductDetailsScreen;