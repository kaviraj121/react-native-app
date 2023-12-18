// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { CartProvider } from './CartContext';
import { FavoritesProvider } from './FavoritesContext';
import HomeScreen from './screens/HomeScreen';
import ProductDetailsScreen from './screens/ProductDetailsScreen';
import CartScreen from './screens/CartScreen';
import FavoriteComponent from './screens/FavoriteComponent';
import { Ionicons } from '@expo/vector-icons';

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeStackHome" component={HomeScreen} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <CartProvider>
        <FavoritesProvider>
          <Tab.Navigator shifting={true}>
            <Tab.Screen
              name="Home"
              component={HomeStack}
              options={{
                tabBarIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
              }}
            />
            <Tab.Screen
              name="Favorites"
              component={FavoriteComponent}
              options={{
                tabBarIcon: ({ color }) => <Ionicons name="heart" size={26} color={color} />,
              }}
            />
            <Tab.Screen
              name="Cart"
              component={CartScreen}
              options={{
                tabBarIcon: ({ color }) => <Ionicons name="cart" size={26} color={color} />,
              }}
            />
          </Tab.Navigator>
        </FavoritesProvider>
      </CartProvider>
    </NavigationContainer>
  );
};

export default App;
