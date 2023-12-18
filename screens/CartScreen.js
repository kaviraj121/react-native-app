import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useCart } from '../CartContext';

const CartScreen = ({ navigation }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  console.log('Cart Data:', cart);

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const deliveryCharge = 2; // Assuming a fixed delivery charge
    return subtotal + deliveryCharge;
  };

  const handleDecreaseQuantity = (itemId) => {
    updateQuantity(itemId, Math.max(1, cart.find((item) => item.id === itemId).quantity - 1));
  };

  const handleIncreaseQuantity = (itemId) => {
    updateQuantity(itemId, cart.find((item) => item.id === itemId).quantity + 1);
  };

  const renderProductCard = ({ item }) => (
    <View style={styles.cartItem} key={item.id.toString()}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity onPress={() => handleDecreaseQuantity(item.id)}>
            <Text style={styles.quantityButton}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => handleIncreaseQuantity(item.id)}>
            <Text style={styles.quantityButton}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.itemPrice}>${item.price * item.quantity}</Text>
      <TouchableOpacity onPress={() => removeFromCart(item.id)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        renderItem={renderProductCard}
      />

      <View style={styles.totalContainer}>
        <Text style={styles.subtotal}>Subtotal: ${calculateSubtotal()}</Text>
        <Text style={styles.deliveryCharge}>Delivery Charge: $2</Text>
        <Text style={styles.total}>Total: ${calculateTotal()}</Text>
      </View>

      <TouchableOpacity
        style={styles.proceedButton}
        onPress={() => navigation.navigate('Checkout')}
        disabled={cart.length === 0}
      >
        <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
      
    </View>

    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  itemDetails: {
    flex: 1,
    marginRight: 8,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    paddingHorizontal: 8,
    color: '#007BFF',
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 8,
  },
  subtotal: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryCharge: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 8,
  },
  proceedButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  proceedButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
