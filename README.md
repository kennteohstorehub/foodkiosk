# 🍔 Food Kiosk - Multi-Platform Restaurant Ordering System

A modern, feature-rich food kiosk application built with React Native and React, designed for seamless restaurant ordering experiences across mobile and web platforms.

## 🚀 Features

### Core Functionality
- **📱 Cross-Platform Support**: Native mobile app (iOS/Android) and responsive web application
- **🛒 Smart Cart Management**: Add, remove, modify quantities with animated feedback
- **🔍 Advanced Search**: Search by item name, description, or category
- **📊 Category Filtering**: Organized menu browsing with intuitive category navigation
- **📝 Order History**: Track previous orders and reorder favorites
- **💳 Multiple Payment Options**: Support for cash and card payments

### User Experience
- **🎨 Modern Material Design**: Beautiful, intuitive interface with consistent theming
- **⚡ Smooth Animations**: Engaging micro-interactions and transitions
- **📳 Haptic Feedback**: Tactile responses for mobile interactions
- **🎯 Accessibility**: Screen reader support and keyboard navigation
- **📱 Responsive Design**: Optimized for all screen sizes

### Technical Features
- **🔧 TypeScript**: Full type safety and enhanced development experience
- **📦 State Management**: Redux Toolkit for predictable state management
- **🧪 Testing**: Comprehensive test suite with Jest and React Testing Library
- **🔄 Hot Reload**: Fast development with instant updates
- **📈 Performance**: Optimized rendering and smooth animations

## 🛠️ Tech Stack

### Mobile App (React Native)
- **React Native 0.80.1** - Cross-platform mobile development
- **TypeScript 5.0.4** - Type safety and enhanced development
- **Redux Toolkit 2.8.2** - State management
- **React Navigation 7.x** - Navigation and routing
- **React Native Paper 5.14.5** - Material Design components
- **React Native Vector Icons 10.2.0** - Icon library
- **React Native Reanimated 3.18.0** - Advanced animations
- **React Native Gesture Handler 2.27.1** - Touch gestures

### Web App (React)
- **React 19.1.0** - Modern React with latest features
- **TypeScript 4.9.5** - Type safety
- **Redux Toolkit 2.8.2** - State management
- **React Icons 5.5.0** - Icon library
- **React Testing Library 16.3.0** - Testing utilities
- **Create React App 5.0.1** - Build tooling

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Metro** - React Native bundler
- **Babel** - JavaScript transpilation

## 📁 Project Structure

```
Kiosk/
├── FoodKiosk/                    # React Native Mobile App
│   ├── src/
│   │   └── screens/
│   │       ├── MenuScreen.tsx    # Main menu with categories & search
│   │       ├── CartScreen.tsx    # Shopping cart management
│   │       └── OrderHistoryScreen.tsx # Order history
│   ├── android/                  # Android-specific files
│   ├── ios/                      # iOS-specific files
│   └── package.json
├── food-kiosk-web/              # React Web App
│   ├── src/
│   │   ├── App.tsx              # Main web application
│   │   └── components/          # Reusable components
│   ├── public/                  # Static assets
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **React Native CLI** (for mobile development)
- **Xcode** (for iOS development - macOS only)
- **Android Studio** (for Android development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kennteohstorehub/foodkiosk.git
   cd foodkiosk
   ```

2. **Install Mobile App Dependencies**
   ```bash
   cd FoodKiosk
   npm install
   
   # For iOS (macOS only)
   cd ios && pod install && cd ..
   ```

3. **Install Web App Dependencies**
   ```bash
   cd food-kiosk-web
   npm install
   ```

### Running the Applications

#### Mobile App (React Native)

**Start Metro Bundler**
```bash
cd FoodKiosk
npm start
```

**Run on iOS** (macOS only)
```bash
npm run ios
```

**Run on Android**
```bash
npm run android
```

#### Web App (React)

```bash
cd food-kiosk-web
npm start
```

The web app will open at `http://localhost:3000`

## 🧪 Testing

### Mobile App
```bash
cd FoodKiosk
npm test
```

### Web App
```bash
cd food-kiosk-web
npm test
```

## 🔧 Development

### Code Style
- **ESLint** configuration for consistent code quality
- **Prettier** for automatic code formatting
- **TypeScript** for type safety

### Available Scripts

#### Mobile App
- `npm start` - Start Metro bundler
- `npm run ios` - Run on iOS simulator
- `npm run android` - Run on Android emulator
- `npm run lint` - Run ESLint
- `npm test` - Run tests

#### Web App
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## 📱 App Architecture

### State Management
- **Redux Toolkit** for global state management
- **Local state** for component-specific data
- **Async actions** for API calls and data fetching

### Navigation
- **React Navigation** for mobile app navigation
- **React Router** for web app routing
- **Deep linking** support for mobile

### Performance Optimization
- **Memoization** for expensive calculations
- **Lazy loading** for code splitting
- **Image optimization** for faster loading
- **Animation optimization** using native driver

## 🎨 Design System

### Color Palette
- **Primary**: #FF6B35 (Orange)
- **Secondary**: #004E89 (Blue)
- **Background**: #F8F9FA
- **Surface**: #FFFFFF
- **Text**: #333333

### Typography
- **Primary Font**: System default
- **Font Sizes**: 12px, 14px, 16px, 18px, 24px, 32px
- **Font Weights**: 400 (Regular), 600 (Semi-bold), 700 (Bold)

### Spacing
- **Base Unit**: 8px
- **Spacing Scale**: 4px, 8px, 16px, 24px, 32px, 48px

## 🔒 Security

- **Input validation** for all user inputs
- **Secure API calls** with proper authentication
- **Data encryption** for sensitive information
- **Error handling** to prevent information leakage

## 📊 Performance

- **Optimized rendering** with React.memo and useMemo
- **Efficient state updates** with Redux Toolkit
- **Image optimization** with proper caching
- **Bundle size optimization** with code splitting

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Coding Standards
- Follow TypeScript best practices
- Write tests for new features
- Maintain consistent code formatting
- Add proper documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **React Native Community** for excellent documentation
- **Material Design** for design inspiration
- **Unsplash** for demo images
- **Open Source Contributors** for amazing libraries

## 📞 Support

For support, email support@foodkiosk.com or create an issue in the GitHub repository.

---

Made with ❤️ by [kennteohstorehub](https://github.com/kennteohstorehub)
