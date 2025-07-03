import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Animated,
  TextInput,
  Vibration,
  Alert,
} from 'react-native';
import { Card, Button, Chip, Surface, Badge } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCartAnimation } from '../../App';

const { width, height } = Dimensions.get('window');

interface MenuItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description: string;
  isPopular?: boolean;
  discount?: number;
}

const categories = [
  { id: 'all', name: 'All', icon: 'restaurant' },
  { id: 'burgers', name: 'Burgers', icon: 'lunch-dining' },
  { id: 'chicken', name: 'Chicken', icon: 'egg' },
  { id: 'drinks', name: 'Drinks', icon: 'local-drink' },
  { id: 'desserts', name: 'Desserts', icon: 'cake' },
];

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Big Mac',
    price: 7.99,
    originalPrice: 8.99,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=200&fit=crop',
    category: 'burgers',
    description: 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun',
    isPopular: true,
    discount: 11,
  },
  {
    id: '2',
    name: 'Quarter Pounder',
    price: 9.49,
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300&h=200&fit=crop',
    category: 'burgers',
    description: 'Quarter pound of 100% fresh beef cooked when you order',
    isPopular: true,
  },
  {
    id: '3',
    name: 'Chicken McNuggets',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300&h=200&fit=crop',
    category: 'chicken',
    description: '10 pieces of crispy chicken nuggets made with white meat',
  },
  {
    id: '4',
    name: 'Coca-Cola',
    price: 2.49,
    image: 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=300&h=200&fit=crop',
    category: 'drinks',
    description: 'Refreshing Coca-Cola soft drink - Medium size',
  },
  {
    id: '5',
    name: 'Apple Pie',
    price: 1.99,
    image: 'https://images.unsplash.com/photo-1621743478914-cc8a86d7e7b5?w=300&h=200&fit=crop',
    category: 'desserts',
    description: 'Warm apple pie with flaky crust and cinnamon sugar',
  },
  {
    id: '6',
    name: 'McFlurry Oreo',
    price: 3.49,
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300&h=200&fit=crop',
    category: 'desserts',
    description: 'Vanilla soft serve with Oreo cookie pieces',
  },
];

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [buttonScaleAnims] = useState<{[key: string]: Animated.Value}>({});
  const [cardScaleAnims] = useState<{[key: string]: Animated.Value}>({});
  const [flyingItems, setFlyingItems] = useState<Array<{id: string, animValue: Animated.Value, startX: number, startY: number}>>([]);
  const [successIndicators, setSuccessIndicators] = useState<Array<{id: string, animValue: Animated.Value, x: number, y: number}>>([]);
  const [lastTapTimes] = useState<{[key: string]: number}>({});
  const { triggerCartBounce } = useCartAnimation();

  // Initialize button scale animations with safety checks
  const getButtonScaleAnim = (itemId: string) => {
    try {
      if (!itemId) return new Animated.Value(1);
      if (!buttonScaleAnims[itemId]) {
        buttonScaleAnims[itemId] = new Animated.Value(1);
      }
      return buttonScaleAnims[itemId];
    } catch (error) {
      console.warn('Error getting button animation for item:', itemId, error);
      return new Animated.Value(1);
    }
  };

  // Initialize card scale animations with safety checks
  const getCardScaleAnim = (itemId: string) => {
    try {
      if (!itemId) return new Animated.Value(1);
      if (!cardScaleAnims[itemId]) {
        cardScaleAnims[itemId] = new Animated.Value(1);
      }
      return cardScaleAnims[itemId];
    } catch (error) {
      console.warn('Error getting card animation for item:', itemId, error);
      return new Animated.Value(1);
    }
  };

  const filteredItems = menuItems.filter(item => {
    if (!item || !item.id || !item.name || !item.description) return false;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (item: MenuItem, event?: any) => {
    try {
      // Prevent rapid tapping
      const now = Date.now();
      if (lastTapTimes[item.id] && now - lastTapTimes[item.id] < 1000) {
        return; // Ignore taps within 1 second
      }
      lastTapTimes[item.id] = now;
      
      // Use screen center as starting point for more reliable animation
      const buttonX = width / 2;
      const buttonY = height / 2;
      
      // Haptic feedback with error handling
      try {
        Vibration.vibrate(50);
      } catch (vibrationError) {
        console.log('Vibration not available:', vibrationError);
      }
    
          // Enhanced button press animation with bounce (individual per item)
      const buttonScale = getButtonScaleAnim(item.id);
      if (buttonScale) {
        Animated.sequence([
          Animated.timing(buttonScale, {
            toValue: 0.8,
            duration: 150,
            useNativeDriver: true,
          }),
          Animated.spring(buttonScale, {
            toValue: 1,
            tension: 300,
            friction: 5,
            useNativeDriver: true,
          }),
        ]).start();
      }

      // Card scale animation
      const cardScale = getCardScaleAnim(item.id);
      if (cardScale) {
        Animated.sequence([
          Animated.timing(cardScale, {
            toValue: 0.95,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.spring(cardScale, {
            toValue: 1,
            tension: 200,
            friction: 7,
            useNativeDriver: true,
          }),
        ]).start();
      }

    // Create flying animation
    const flyAnim = new Animated.Value(0);
    const flyingItemId = `${item.id}-${Date.now()}`;
    
    setFlyingItems(prev => [...prev, {
      id: flyingItemId,
      animValue: flyAnim,
      startX: buttonX,
      startY: buttonY
    }]);

    // Create success indicator
    const successAnim = new Animated.Value(0);
    const successId = `success-${Date.now()}`;
    
    setSuccessIndicators(prev => [...prev, {
      id: successId,
      animValue: successAnim,
      x: buttonX,
      y: buttonY
    }]);

    // Animate success indicator
    Animated.sequence([
      Animated.timing(successAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(successAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setSuccessIndicators(prev => prev.filter(indicator => indicator.id !== successId));
    });

    // Animate item flying to cart
    Animated.timing(flyAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start(() => {
      setFlyingItems(prev => prev.filter(flyItem => flyItem.id !== flyingItemId));
      // Trigger cart bounce when item reaches cart
      if (triggerCartBounce) {
        triggerCartBounce();
      }
    });

    console.log('Adding to cart:', item.name);
    // TODO: Implement add to cart functionality
    
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Show user-friendly error message
      Alert.alert('Error', 'Unable to add item to cart. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Search */}
      <Surface style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>Food Kiosk</Text>
        </View>
        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for food..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
        </View>
      </Surface>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <Text style={styles.sectionTitle}>Categories</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.categoryItemSelected
              ]}
            >
              <View style={[
                styles.categoryIcon,
                selectedCategory === category.id && styles.categoryIconSelected
              ]}>
                              <Icon 
                name={category.icon} 
                size={24} 
                color={selectedCategory === category.id ? '#fff' : '#FF6B35'} 
              />
              </View>
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextSelected
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Menu Items */}
      <View style={styles.menuSection}>
        <View style={styles.menuHeader}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <Text style={styles.itemCount}>{filteredItems.length} items</Text>
        </View>
        
        <ScrollView 
          style={styles.menuContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.menuGrid}>
            {filteredItems.map((item) => {
              if (!item || !item.id) return null;
              return (
                <Animated.View
                  key={item.id}
                  style={[
                    styles.menuCardContainer,
                    {
                      transform: [{ scale: getCardScaleAnim(item.id) }],
                    },
                  ]}
                >
              
                <Surface style={styles.menuCard} elevation={3}>
                  {item.isPopular && (
                    <Badge style={styles.popularBadge}>
                      🔥 Popular
                    </Badge>
                  )}
                  {item.discount && (
                    <Badge style={styles.discountBadge}>
                      {`-${item.discount}%`}
                    </Badge>
                  )}
                  
                  <View style={styles.imageContainer}>
                    <Image 
                      source={{ uri: item.image }} 
                      style={styles.menuImage}
                      resizeMode="cover"
                    />
                    <View style={styles.imageOverlay} />
                  </View>
                  
                  <View style={styles.cardContent}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.itemDescription} numberOfLines={2}>
                      {item.description}
                    </Text>
                    
                    <View style={styles.priceRow}>
                      <View style={styles.priceContainer}>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
                        {item.originalPrice && (
                          <Text style={styles.originalPrice}>
                            ${item.originalPrice.toFixed(2)}
                          </Text>
                        )}
                      </View>
                      
                      <Animated.View style={{ transform: [{ scale: getButtonScaleAnim(item.id) }] }}>
                        <TouchableOpacity
                          style={styles.addButton}
                          onPress={() => addToCart(item)}
                          activeOpacity={0.8}
                        >
                          <Icon name="add" size={20} color="#fff" />
                        </TouchableOpacity>
                      </Animated.View>
                    </View>
                  </View>
                </Surface>
              </Animated.View>
              );
            })}
          </View>
        </ScrollView>
      </View>
      
      {/* Flying Animation Overlay */}
      {flyingItems.map((flyItem) => (
        <Animated.View
          key={flyItem.id}
          style={[
            styles.flyingItem,
            {
              left: flyItem.startX - 20,
              top: flyItem.startY - 20,
              transform: [
                {
                  translateX: flyItem.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -width * 0.3], // Fly to left side (cart direction)
                  }),
                },
                {
                  translateY: flyItem.animValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -height * 0.6], // Fly upward toward cart
                  }),
                },
                {
                  scale: flyItem.animValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [1, 1.2, 0.3],
                  }),
                },
              ],
              opacity: flyItem.animValue.interpolate({
                inputRange: [0, 0.8, 1],
                outputRange: [1, 0.8, 0],
              }),
            },
          ]}
        >
          <View style={styles.flyingIcon}>
            <Icon name="restaurant" size={24} color="#FF6B35" />
          </View>
        </Animated.View>
      ))}
      
      {/* Success Indicators */}
      {successIndicators.map((indicator) => (
        <Animated.View
          key={indicator.id}
          style={[
            styles.successIndicator,
            {
              left: indicator.x - 30,
              top: indicator.y - 30,
              transform: [
                {
                  scale: indicator.animValue.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0.5, 1.2, 0.8],
                  }),
                },
              ],
              opacity: indicator.animValue,
            },
          ]}
        >
          <View style={styles.successIcon}>
            <Icon name="check" size={20} color="#4CAF50" />
          </View>
          <Text style={styles.successText}>Added!</Text>
        </Animated.View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 15,
    elevation: 2,
  },
  headerContent: {
    marginBottom: 15,
  },
  welcomeText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '400',
  },
  brandText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginTop: 2,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 45,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  categoriesSection: {
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  categoriesContainer: {
    paddingHorizontal: 15,
  },
  categoryItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    paddingVertical: 8,
    width: 80,
  },
  categoryItemSelected: {
    // Selected state handled by individual elements
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  categoryIconSelected: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  menuSection: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 15,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  itemCount: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  menuCardContainer: {
    width: (width - 30) / 2,
    marginBottom: 20,
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6B35',
    color: '#fff',
    fontSize: 10,
    zIndex: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 10,
    zIndex: 10,
  },
  imageContainer: {
    position: 'relative',
    height: 140,
  },
  menuImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  cardContent: {
    padding: 15,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flex: 1,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#FF6B35',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  flyingItem: {
    position: 'absolute',
    width: 40,
    height: 40,
    zIndex: 1000,
    pointerEvents: 'none',
  },
  flyingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  successIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    pointerEvents: 'none',
  },
  successIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 5,
  },
  successText: {
    color: '#4CAF50',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MenuScreen; 