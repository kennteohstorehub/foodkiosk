import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');

// Mock data for menu items
const menuCategories = [
  {
    id: 1,
    name: 'Burgers',
    icon: '🍔',
    items: [
      {id: 1, name: 'Classic Burger', price: 8.99, image: '🍔'},
      {id: 2, name: 'Cheese Burger', price: 9.99, image: '🍔'},
      {id: 3, name: 'Deluxe Burger', price: 12.99, image: '🍔'},
    ],
  },
  {
    id: 2,
    name: 'Fries',
    icon: '🍟',
    items: [
      {id: 4, name: 'Regular Fries', price: 3.99, image: '🍟'},
      {id: 5, name: 'Large Fries', price: 4.99, image: '🍟'},
      {id: 6, name: 'Loaded Fries', price: 6.99, image: '🍟'},
    ],
  },
  {
    id: 3,
    name: 'Drinks',
    icon: '🥤',
    items: [
      {id: 7, name: 'Soft Drink', price: 2.99, image: '🥤'},
      {id: 8, name: 'Coffee', price: 3.49, image: '☕'},
      {id: 9, name: 'Milkshake', price: 4.99, image: '🥤'},
    ],
  },
  {
    id: 4,
    name: 'Desserts',
    icon: '🍰',
    items: [
      {id: 10, name: 'Ice Cream', price: 3.99, image: '🍦'},
      {id: 11, name: 'Apple Pie', price: 4.49, image: '🥧'},
      {id: 12, name: 'Cookies', price: 2.99, image: '🍪'},
    ],
  },
];

function App(): JSX.Element {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, {...item, quantity: 1}]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const WelcomeScreen = () => (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>Welcome to Food Kiosk</Text>
      <Text style={styles.welcomeSubtitle}>Touch anywhere to start your order</Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => setCurrentScreen('menu')}>
        <Text style={styles.startButtonText}>START ORDER</Text>
      </TouchableOpacity>
    </View>
  );

  const MenuScreen = () => (
    <View style={styles.menuContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Select Category</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setCurrentScreen('cart')}>
          <Text style={styles.cartButtonText}>Cart ({cart.length}) - ${getTotalPrice()}</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.categoriesGrid}>
        {menuCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            style={styles.categoryCard}
            onPress={() => {
              setSelectedCategory(category);
              setCurrentScreen('items');
            }}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryName}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentScreen('welcome')}>
        <Text style={styles.backButtonText}>← Back to Welcome</Text>
      </TouchableOpacity>
    </View>
  );

  const ItemsScreen = () => (
    <View style={styles.menuContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{selectedCategory?.name}</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => setCurrentScreen('cart')}>
          <Text style={styles.cartButtonText}>Cart ({cart.length}) - ${getTotalPrice()}</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView contentContainerStyle={styles.itemsGrid}>
        {selectedCategory?.items.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.itemCard}
            onPress={() => addToCart(item)}>
            <Text style={styles.itemIcon}>{item.image}</Text>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <View style={styles.addButton}>
              <Text style={styles.addButtonText}>ADD TO CART</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentScreen('menu')}>
        <Text style={styles.backButtonText}>← Back to Categories</Text>
      </TouchableOpacity>
    </View>
  );

  const CartScreen = () => (
    <View style={styles.cartContainer}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Order</Text>
      </View>
      
      <ScrollView style={styles.cartItems}>
        {cart.map((item, index) => (
          <View key={index} style={styles.cartItem}>
            <Text style={styles.cartItemIcon}>{item.image}</Text>
            <Text style={styles.cartItemName}>{item.name}</Text>
            <Text style={styles.cartItemPrice}>${item.price}</Text>
          </View>
        ))}
        
        {cart.length === 0 && (
          <Text style={styles.emptyCart}>Your cart is empty</Text>
        )}
      </ScrollView>
      
      <View style={styles.cartFooter}>
        <Text style={styles.totalText}>Total: ${getTotalPrice()}</Text>
        <TouchableOpacity
          style={[styles.checkoutButton, cart.length === 0 && styles.disabledButton]}
          disabled={cart.length === 0}
          onPress={() => {
            alert('Order placed successfully!');
            setCart([]);
            setCurrentScreen('welcome');
          }}>
          <Text style={styles.checkoutButtonText}>PLACE ORDER</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => setCurrentScreen(selectedCategory ? 'items' : 'menu')}>
        <Text style={styles.backButtonText}>← Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'welcome':
        return <WelcomeScreen />;
      case 'menu':
        return <MenuScreen />;
      case 'items':
        return <ItemsScreen />;
      case 'cart':
        return <CartScreen />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      {renderScreen()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  welcomeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    padding: 40,
  },
  welcomeTitle: {
    fontSize: 80,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  welcomeSubtitle: {
    fontSize: 32,
    color: 'white',
    textAlign: 'center',
    marginBottom: 60,
  },
  startButton: {
    backgroundColor: 'white',
    paddingHorizontal: 80,
    paddingVertical: 30,
    borderRadius: 15,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  menuContainer: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
  },
  cartButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
  },
  cartButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  categoryCard: {
    backgroundColor: 'white',
    width: width * 0.4,
    height: 250,
    margin: 10,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  categoryIcon: {
    fontSize: 80,
    marginBottom: 20,
  },
  categoryName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  itemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  itemCard: {
    backgroundColor: 'white',
    width: width * 0.28,
    height: 300,
    margin: 10,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  itemIcon: {
    fontSize: 60,
  },
  itemName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 28,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartContainer: {
    flex: 1,
    padding: 20,
  },
  cartItems: {
    flex: 1,
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2,
  },
  cartItemIcon: {
    fontSize: 40,
    marginRight: 20,
  },
  cartItemName: {
    fontSize: 24,
    flex: 1,
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  emptyCart: {
    fontSize: 32,
    textAlign: 'center',
    color: '#888',
    marginTop: 50,
  },
  cartFooter: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 20,
  },
  totalText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 20,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  checkoutButtonText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backButton: {
    backgroundColor: '#666',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default App; 