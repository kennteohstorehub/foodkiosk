import React, { useState, useEffect } from 'react';
import './App.css';
import { 
  FaShoppingCart, 
  FaArrowLeft, 
  FaPlus,
  FaHamburger,
  FaGlassCheers,
  FaCookie,
  FaUtensils 
} from 'react-icons/fa';

// Mock data for menu items - StoreHub Demo
const menuCategories = [
  {
    id: 1,
    name: 'Mains',
    icon: <FaHamburger />,
    emoji: '🍔',
    items: [
      { id: 1, name: 'Signature Burger', price: 12.90, image: '🍔' },
      { id: 2, name: 'Grilled Chicken', price: 14.90, image: '🍗' },
      { id: 3, name: 'Fish & Chips', price: 15.90, image: '🐟' },
      { id: 4, name: 'Beef Steak', price: 22.90, image: '🥩' },
    ],
  },
  {
    id: 2,
    name: 'Sides',
    icon: <FaUtensils />,
    emoji: '🍟',
    items: [
      { id: 5, name: 'Crispy Fries', price: 4.90, image: '🍟' },
      { id: 6, name: 'Onion Rings', price: 5.90, image: '🧅' },
      { id: 7, name: 'Garden Salad', price: 6.90, image: '🥗' },
      { id: 8, name: 'Garlic Bread', price: 3.90, image: '🥖' },
    ],
  },
  {
    id: 3,
    name: 'Beverages',
    icon: <FaGlassCheers />,
    emoji: '🥤',
    items: [
      { id: 9, name: 'Fresh Juice', price: 4.50, image: '🧃' },
      { id: 10, name: 'Iced Coffee', price: 5.90, image: '☕' },
      { id: 11, name: 'Soft Drinks', price: 3.90, image: '🥤' },
      { id: 12, name: 'Smoothie', price: 6.90, image: '🥤' },
    ],
  },
  {
    id: 4,
    name: 'Desserts',
    icon: <FaCookie />,
    emoji: '🍰',
    items: [
      { id: 13, name: 'Chocolate Cake', price: 7.90, image: '🍰' },
      { id: 14, name: 'Ice Cream', price: 4.90, image: '🍦' },
      { id: 15, name: 'Fresh Cookies', price: 3.90, image: '🍪' },
      { id: 16, name: 'Fruit Tart', price: 6.90, image: '🥧' },
    ],
  },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface MenuCategory {
  id: number;
  name: string;
  icon: JSX.Element;
  emoji: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    image: string;
  }>;
}

// Sound effect functions
const playButtonSound = () => {
  // Simple audio feedback for better UX
  const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBD2X2/TEcSgELYPQ8diJOAgbaLvt559NEAxPqOPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBD2X2/TEcSgELYPQ8diJOAgbaLvt559NEAxPqOPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBD2X2/TEcSgELYPQ8diJOAgbaLvt559NEAxPqOPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBD2X2/TEcSgELYPQ8diJOAgbaLvt559NEAxPqOPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBD2X2/TEcSgELYPQ8diJOAgbaLvt559NEAxPqOPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBD2X2/TEcSgELYPQ8diJOAgbaLvt559NEAxPqOPwtmMcBjiS1/LNeSsFJHfH8N2QQAoUX');
  audio.volume = 0.1;
  audio.play().catch(() => {}); // Ignore errors if audio doesn't work
};

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  // Auto-return to welcome screen after inactivity
  useEffect(() => {
    const resetTimer = () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      const newTimeoutId = setTimeout(() => {
        if (currentScreen !== 'welcome') {
          setCurrentScreen('welcome');
          setCart([]);
          setSelectedCategory(null);
        }
      }, 120000); // 2 minutes of inactivity
      setTimeoutId(newTimeoutId);
    };

    resetTimer();
    
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [currentScreen, timeoutId]);

  const addToCart = (item: any) => {
    playButtonSound();
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleNavigation = (screen: string) => {
    playButtonSound();
    setCurrentScreen(screen);
  };

  const WelcomeScreen = () => (
    <div className="welcome-container">
      <h1 className="welcome-title">StoreHub Demo Kiosk</h1>
      <p className="welcome-subtitle">Experience seamless self-service ordering</p>
      <div className="welcome-features">
        <div className="feature-item">
          <FaHamburger className="feature-icon" />
          <span>Quality<br/>Food</span>
        </div>
        <div className="feature-item">
          <FaGlassCheers className="feature-icon" />
          <span>Fresh<br/>Beverages</span>
        </div>
        <div className="feature-item">
          <FaCookie className="feature-icon" />
          <span>Sweet<br/>Treats</span>
        </div>
      </div>
      <button
        className="start-button pulse"
        onClick={() => handleNavigation('menu')}>
        Start Ordering
      </button>
    </div>
  );

  const MenuScreen = () => (
    <div className="menu-container">
      <div className="header">
        <h1 className="header-title">What would you like today?</h1>
        <button
          className="cart-button"
          onClick={() => handleNavigation('cart')}>
          <FaShoppingCart className="cart-icon" />
          Cart ({cart.length}) - ${getTotalPrice()}
        </button>
      </div>

      <div className="categories-grid">
        {menuCategories.map(category => (
          <button
            key={category.id}
            className="category-card"
            onClick={() => {
              playButtonSound();
              setSelectedCategory(category);
              setCurrentScreen('items');
            }}>
            <div className="category-icon-container">
              {category.icon}
              <span className="category-emoji">{category.emoji}</span>
            </div>
            <span className="category-name">{category.name}</span>
          </button>
        ))}
      </div>

      <button
        className="back-button"
        onClick={() => handleNavigation('welcome')}>
        <FaArrowLeft /> Back to Welcome
      </button>
    </div>
  );

  const ItemsScreen = () => (
    <div className="menu-container">
      <div className="header">
        <h1 className="header-title">{selectedCategory?.name}</h1>
        <button
          className="cart-button"
          onClick={() => handleNavigation('cart')}>
          <FaShoppingCart className="cart-icon" />
          Cart ({cart.length}) - ${getTotalPrice()}
        </button>
      </div>

      <div className="items-grid">
        {selectedCategory?.items.map(item => (
          <div key={item.id} className="item-card">
            <span className="item-icon">{item.image}</span>
            <h3 className="item-name">{item.name}</h3>
            <p className="item-price">${item.price}</p>
            <button
              className="add-button"
              onClick={() => addToCart(item)}>
              <FaPlus className="add-icon" />
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        className="back-button"
        onClick={() => handleNavigation('menu')}>
        <FaArrowLeft /> Back to Menu
      </button>
    </div>
  );

  const CartScreen = () => (
    <div className="cart-container">
      <div className="header">
        <h1 className="header-title">Order Summary</h1>
      </div>

      <div className="cart-items">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <span className="cart-item-icon">{item.image}</span>
            <span className="cart-item-name">{item.name}</span>
            <span className="cart-item-price">${item.price}</span>
          </div>
        ))}

        {cart.length === 0 && (
          <div className="empty-cart">
            <FaShoppingCart className="empty-cart-icon" />
            <p>Your cart is empty</p>
            <p>Browse our menu to get started!</p>
          </div>
        )}
      </div>

      <div className="cart-footer">
        <p className="total-text">Total: ${getTotalPrice()}</p>
        <button
          className={`checkout-button ${cart.length === 0 ? 'disabled' : ''}`}
          disabled={cart.length === 0}
          onClick={() => {
            playButtonSound();
            alert('🎉 Order placed successfully!\n\nThank you for trying StoreHub Demo Kiosk!\n\nIn a real restaurant, this would:\n• Send order to kitchen\n• Process payment\n• Print receipt\n• Update inventory\n\nLearn more at storehub.com');
            setCart([]);
            setCurrentScreen('welcome');
          }}>
          Place Order - ${getTotalPrice()}
        </button>
      </div>

      <button
        className="back-button"
        onClick={() => handleNavigation(selectedCategory ? 'items' : 'menu')}>
        <FaArrowLeft /> Continue Shopping
      </button>
    </div>
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
    <div className="app" onClick={() => {
      // Reset inactivity timer on any interaction
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }}>
      {renderScreen()}
    </div>
  );
}

export default App; 