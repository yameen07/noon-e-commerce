# Noon E-commerce Mobile App

A modern React Native e-commerce application built with TypeScript, featuring a clean feature-based architecture and comprehensive shopping cart functionality.

## 🚀 Features

- **Product Browsing**: Browse products with carousel banners and category filtering
- **Product Search**: Search functionality to find products quickly
- **Product Details**: Detailed product views with image galleries
- **Shopping Cart**: Add, remove, and manage items in your cart
- **Order Review**: Review your order with payment method selection
- **Order Confirmation**: Confirmation screen after successful order placement

## 📋 Prerequisites

- **Node.js**: >= 20.0.0
- **React Native**: 0.82.1
- **iOS Development**: Xcode (for iOS builds)
- **Android Development**: Android Studio (for Android builds)
- **Package Manager**: Yarn (recommended) or npm

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd NoonEcommerce
   ```

2. **Install dependencies**

   ```bash
   yarn install
   # or
   npm install
   ```

3. **iOS Setup** (macOS only)
   ```bash
   cd ios
   pod install
   cd ..
   ```

## 🏃 Running the App

### Start Metro Bundler

```bash
yarn start
# or
npm start
```

### Run on iOS

```bash
yarn ios
# or
npm run ios
```

### Run on Android

```bash
yarn android
# or
npm run android
```

## 📱 Available Scripts

- `yarn start` - Start Metro bundler
- `yarn ios` - Run on iOS simulator
- `yarn android` - Run on Android emulator
- `yarn ios:clean` - Clean iOS build
- `yarn android:clean` - Clean Android build
- `yarn ios:release` - Build iOS release
- `yarn android:release` - Build Android release
- `yarn lint` - Run ESLint
- `yarn test` - Run Jest tests

## 🏗️ Project Structure

```
NoonEcommerce/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── BannerCarousel.tsx
│   │   ├── CartButton.tsx
│   │   └── ProductCard.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/            # Feature-based screen modules
│   │   ├── HomeScreen/
│   │   ├── SearchScreen/
│   │   ├── ProductDetailsScreen/
│   │   ├── CartScreen/
│   │   ├── CartReviewScreen/
│   │   └── ConfirmationScreen/
│   ├── store/              # Redux store configuration
│   │   ├── slices/         # Redux slices
│   │   └── hooks.ts        # Typed Redux hooks
│   ├── services/           # API and data services
│   │   └── mockData.ts
│   ├── types/              # Global TypeScript types
│   │   └── index.ts
│   └── utils/              # Utility functions
│       └── formatCurrency.ts
├── App.tsx                  # Root component
└── package.json
```

## 🎨 Architecture

This project follows a **feature-based architecture** where each screen is a self-contained feature module. See [ARCHITECTURE.md](./ARCHITECTURE.md) for detailed architecture documentation.

### Key Principles

- **Feature-based organization**: Each screen has its own folder with UI, logic, and types
- **Separation of concerns**: UI components are separated from business logic
- **Type safety**: Full TypeScript support throughout the application
- **State management**: Redux Toolkit for global state management
- **Custom hooks**: Business logic encapsulated in custom hooks

## 🧩 Technology Stack

- **React Native**: 0.82.1
- **TypeScript**: 5.8.3
- **Redux Toolkit**: 2.0.1 - State management
- **React Navigation**: 6.1.9 - Navigation
- **React Native Paper**: 5.11.3 - UI components
- **React Native Fast Image**: 8.6.3 - Image optimization
- **React Native Reanimated**: 4.1.5 - Animations
- **Shopify Flash List**: 1.6.3 - High-performance lists

## 📦 State Management

The app uses Redux Toolkit for state management with the following slices:

- **cartSlice**: Manages shopping cart state (items, quantities)
- **productsSlice**: Manages product data and filtering

## 🧪 Testing

Run tests with:

```bash
yarn test
```

## 📝 Code Style

- ESLint for linting
- Prettier for code formatting
- TypeScript for type safety

## 🔄 Navigation Flow

```
Home → Search → ProductDetails
  ↓
Cart → CartReview → Confirmation
```

## 🎯 Key Features Implementation

### Shopping Cart

- Add/remove items
- Update quantities
- Calculate totals
- Persistent cart state

### Product Management

- Product listing with categories
- Product search
- Product details with image gallery
- Banner carousel on home screen

### Order Flow

- Cart review
- Payment method selection
- Order summary calculation
- Order confirmation

## 📄 License

This project is private and proprietary.
