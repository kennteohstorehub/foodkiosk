import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import { Card, Button, IconButton, Divider, Surface, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LogoButton from '../components/LogoButton';

const { width } = Dimensions.get('window');

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  customizations?: string[];
}

// Mock cart data - in a real app, this would come from Redux store
const mockCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Big Mac',
    price: 7.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    customizations: ['No pickles', 'Extra sauce'],
  },
  {
    id: '3',
    name: 'Chicken McNuggets',
    price: 6.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
    customizations: ['BBQ Sauce'],
  },
  {
    id: '4',
    name: 'Coca-Cola',
    price: 2.49,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop',
  },
];

const CartScreen = () => {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [buttonScale] = useState(new Animated.Value(1));

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = subtotal > 25 ? 0 : 2.99; // Free delivery over RM25
  const total = subtotal + tax + deliveryFee;

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setCartItems(prevItems => prevItems.filter(item => item.id !== id));
          },
        },
      ]
    );
  };

  const clearCart = () => {
    Alert.alert(
      'Clear Cart',
      'Are you sure you want to clear your entire cart?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: () => setCartItems([]),
        },
      ]
    );
  };

  const checkout = () => {
    // Animate button press
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Alert.alert(
      'Proceed to Checkout',
      `Total: RM${total.toFixed(2)}\n\nChoose payment method:`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Cash', onPress: () => console.log('Cash payment selected') },
        { text: 'Card', onPress: () => console.log('Card payment selected') },
      ]
    );
  };

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="shopping-cart" size={80} color="#ddd" />
        <Text style={styles.emptyText}>Your cart is empty</Text>
        <Text style={styles.emptySubtext}>Add some delicious items from the menu to get started!</Text>
        <TouchableOpacity style={styles.shopButton}>
          <Text style={styles.shopButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Your Order</Text>
          <View style={styles.headerActions}>
            <Badge style={styles.itemBadge}>{cartItems.length}</Badge>
            <LogoButton
              onPress={clearCart}
              size={28}
              backgroundColor="#FF6B35"
            />
          </View>
        </View>
      </Surface>

      {/* Cart Items */}
      <ScrollView style={styles.itemsContainer} showsVerticalScrollIndicator={false}>
        {cartItems.map((item, index) => (
          <Surface key={item.id} style={styles.cartItem} elevation={2}>
            <View style={styles.itemRow}>
              <View style={styles.itemImageContainer}>
                <Card.Cover 
                  source={{ uri: item.image }} 
                  style={styles.itemImage}
                />
              </View>
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>RM{item.price.toFixed(2)} each</Text>
                
                {item.customizations && (
                  <View style={styles.customizationsContainer}>
                    {item.customizations.map((customization, idx) => (
                      <Text key={idx} style={styles.customizationText}>
                        • {customization}
                      </Text>
                    ))}
                  </View>
                )}
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    activeOpacity={0.7}
                  >
                    <Icon name="remove" size={20} color="#FF6B35" />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateQuantity(item.id, item.quantity + 1)}
                    activeOpacity={0.7}
                  >
                    <Icon name="add" size={20} color="#FF6B35" />
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.itemActions}>
                <Text style={styles.itemTotal}>
                  RM{(item.price * item.quantity).toFixed(2)}
                </Text>
                <LogoButton
                  onPress={() => removeItem(item.id)}
                  size={32}
                  backgroundColor="#FF4500"
                />
              </View>
            </View>
          </Surface>
        ))}
      </ScrollView>

      {/* Order Summary */}
      <Surface style={styles.summaryCard} elevation={4}>
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <Icon name="receipt" size={20} color="#FF6B35" />
        </View>
        
        <View style={styles.summaryContent}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal ({cartItems.length} items)</Text>
            <Text style={styles.summaryValue}>RM{subtotal.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Tax (8%)</Text>
            <Text style={styles.summaryValue}>RM{tax.toFixed(2)}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Delivery Fee 
              {subtotal > 25 && <Text style={styles.freeText}> (FREE)</Text>}
            </Text>
            <Text style={[styles.summaryValue, subtotal > 25 && styles.freeValue]}>
              RM{deliveryFee.toFixed(2)}
            </Text>
          </View>
          
          {subtotal < 25 && (
            <View style={styles.promoContainer}>
              <Icon name="local-offer" size={16} color="#4CAF50" />
              <Text style={styles.promoText}>
                Add RM{(25 - subtotal).toFixed(2)} more for free delivery!
              </Text>
            </View>
          )}
          
          <Divider style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>RM{total.toFixed(2)}</Text>
          </View>
          
          <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={checkout}
              activeOpacity={0.9}
            >
              <Icon name="payment" size={20} color="#fff" style={styles.checkoutIcon} />
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Surface>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 20,
    paddingVertical: 15,
    elevation: 2,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemBadge: {
    backgroundColor: '#FF6B35',
    color: '#fff',
    marginRight: 10,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#1a1a1a',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#b0b0b0',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 30,
  },
  shopButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flex: 1,
    padding: 15,
  },
  cartItem: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#404040',
  },
  itemRow: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'flex-start',
  },
  itemImageContainer: {
    marginRight: 15,
  },
  itemImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    color: '#b0b0b0',
    marginBottom: 8,
  },
  customizationsContainer: {
    marginBottom: 10,
  },
  customizationText: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginBottom: 2,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#404040',
    borderWidth: 2,
    borderColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    position: 'relative',
    overflow: 'hidden',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e0e0e0',
    marginHorizontal: 15,
    minWidth: 20,
    textAlign: 'center',
  },
  itemActions: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
  },
  itemTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B35',
  },

  summaryCard: {
    backgroundColor: '#2d2d2d',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#404040',
  },
  summaryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#404040',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  summaryContent: {
    padding: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#b0b0b0',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e0e0e0',
  },
  freeText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
  },
  freeValue: {
    textDecorationLine: 'line-through',
    color: '#4CAF50',
  },
  promoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0d2818',
    padding: 10,
    borderRadius: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  promoText: {
    fontSize: 12,
    color: '#4CAF50',
    marginLeft: 5,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 15,
    height: 1,
    backgroundColor: '#404040',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e0e0e0',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 2,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  checkoutIcon: {
    marginRight: 8,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartScreen; 