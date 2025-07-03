/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { createContext, useContext, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { StatusBar, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens (we'll create these)
import MenuScreen from './src/screens/MenuScreen';
import CartScreen from './src/screens/CartScreen';
import OrderHistoryScreen from './src/screens/OrderHistoryScreen';

// Redux store (basic setup)
const store = configureStore({
  reducer: {
    // We'll add reducers here
  },
});

// Cart Animation Context
const CartAnimationContext = createContext<{
  triggerCartBounce: () => void;
} | null>(null);

export const useCartAnimation = () => {
  const context = useContext(CartAnimationContext);
  if (!context) {
    throw new Error('useCartAnimation must be used within CartAnimationProvider');
  }
  return context;
};

const Tab = createBottomTabNavigator();

function App() {
  // Create cart animation state within the component
  const [cartBounceAnim] = useState(new Animated.Value(1));
  
  const triggerCartBounce = () => {
    Animated.sequence([
      Animated.timing(cartBounceAnim, {
        toValue: 1.3,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(cartBounceAnim, {
        toValue: 1,
        tension: 300,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animated Cart Icon Component (moved inside App)
  const AnimatedCartIcon = ({ color, size }: { color: string; size: number }) => {
    return (
      <Animated.View style={{ transform: [{ scale: cartBounceAnim }] }}>
        <Icon name="shopping-cart" size={size} color={color} />
      </Animated.View>
    );
  };

  return (
    <Provider store={store}>
      <PaperProvider>
        <CartAnimationContext.Provider value={{ triggerCartBounce }}>
          <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#FF6B35" />
            <Tab.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#FF6B35',
                },
                headerTintColor: '#fff',
                tabBarActiveTintColor: '#FF6B35',
                tabBarInactiveTintColor: '#666',
              }}
            >
              <Tab.Screen
                name="Menu"
                component={MenuScreen}
                options={{
                  title: 'Food Kiosk',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="restaurant-menu" size={size} color={color} />
                  ),
                }}
              />
              <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                  title: 'Cart',
                  tabBarIcon: ({ color, size }) => (
                    <AnimatedCartIcon color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Orders"
                component={OrderHistoryScreen}
                options={{
                  title: 'Orders',
                  tabBarIcon: ({ color, size }) => (
                    <Icon name="history" size={size} color={color} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </CartAnimationContext.Provider>
      </PaperProvider>
    </Provider>
  );
}

export default App;
