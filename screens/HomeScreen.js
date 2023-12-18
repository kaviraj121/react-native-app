// screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { Dimensions } from 'react-native';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products); // Extract products from the response
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductPress = (productId) => {
    // Navigate to Product Details screen with the selected product
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    navigation.navigate('ProductDetails', { productId });
  };

  const renderProductCard = ({ item }) => (
    <TouchableOpacity onPress={() => handleProductPress(item.id)}>
      <View style={styles.card}>
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productDescription}>{item.description}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View>
        {/* Loading indicator */}
      </View>
    );
  }

  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProductCard}
        numColumns={2} // Set the number of columns to 2
      />
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const cardWidth = (windowWidth - 40) / 2; //
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    margin: 5,
    backgroundColor: '#fff',
    flex: 1, // Take up equal space in the row
    maxWidth: windowWidth / 2 - 15, // Adjusted width based on the screen width
  },
  thumbnail: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
    marginBottom: 5,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});


export default HomeScreen;
