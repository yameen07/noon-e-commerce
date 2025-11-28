# Architecture Documentation

## Table of Contents

1. [Overview](#overview)
2. [Architecture Patterns](#architecture-patterns)
3. [Project Structure](#project-structure)
4. [Feature-Based Architecture](#feature-based-architecture)
5. [State Management](#state-management)
6. [Navigation](#navigation)
7. [Data Flow](#data-flow)
8. [Component Architecture](#component-architecture)

## Overview

The Noon E-commerce mobile application is built using React Native with TypeScript, following a **feature-based architecture** pattern. This architecture promotes code organization, maintainability, and scalability by co-locating related functionality.

### Core Principles

- **Feature-based organization**: Each screen is a self-contained feature module
- **Separation of concerns**: Clear boundaries between UI, business logic, and data
- **Type safety**: Full TypeScript coverage for compile-time safety
- **Scalability**: Architecture supports easy addition of new features
- **Testability**: Business logic is isolated and easily testable

## Architecture Patterns

### 1. Feature-Based Architecture

Each screen is organized as a feature module containing:

- UI components (presentation layer)
- Business logic hooks (application layer)
- Type definitions (type layer)
- Screen-specific utilities (if needed)

### 2. Container/Presenter Pattern

- **Container (Hook)**: Contains business logic, data fetching, state management
- **Presenter (Component)**: Handles UI rendering and user interactions

### 3. Redux Pattern

- Centralized state management using Redux Toolkit
- Actions and reducers for state mutations
- Async operations using `createAsyncThunk`

## Project Structure

```
src/
├── components/          # Shared, reusable UI components
│   ├── BannerCarousel.tsx
│   ├── CartButton.tsx
│   └── ProductCard.tsx
│
├── navigation/         # Navigation configuration
│   └── AppNavigator.tsx
│
├── screens/           # Feature modules (one per screen)
│   ├── HomeScreen/
│   │   ├── HomeScreen.tsx
│   │   ├── types.ts
│   │   └── hooks/
│   │       └── useHomeScreenLogic.ts
│   ├── SearchScreen/
│   ├── ProductDetailsScreen/
│   ├── CartScreen/
│   ├── CartReviewScreen/
│   └── ConfirmationScreen/
│
├── store/             # Redux store configuration
│   ├── index.ts       # Store setup
│   ├── hooks.ts       # Typed Redux hooks
│   └── slices/        # Redux slices
│       ├── cartSlice.ts
│       └── productsSlice.ts
│
├── services/          # API and data services
│   └── mockData.ts
│
├── types/             # Global TypeScript types
│   └── index.ts
│
└── utils/             # Utility functions
    └── formatCurrency.ts
```

## Feature-Based Architecture

### Screen Module Structure

Each screen follows this consistent structure:

```
ScreenName/
├── ScreenName.tsx          # UI Component (presentation)
├── types.ts                # Screen-specific types
└── hooks/
    └── useScreenNameLogic.ts  # Business logic hook
```

### Component Responsibilities

#### UI Component (`ScreenName.tsx`)

- **Purpose**: Presentation and user interaction
- **Responsibilities**:
  - Render UI elements
  - Handle user interactions (taps, swipes, etc.)
  - Display loading/error states
  - Call hook functions for business operations
- **Should NOT**:
  - Contain business logic
  - Make direct API calls
  - Manage complex state

#### Business Logic Hook (`useScreenNameLogic.ts`)

- **Purpose**: Encapsulate business logic and data operations
- **Responsibilities**:
  - Data fetching and transformation
  - State calculations
  - Navigation logic
  - Integration with Redux store
  - Side effects management
- **Returns**: State and functions for the component to use

#### Types (`types.ts`)

- **Purpose**: Define screen-specific TypeScript types
- **Contains**:
  - Component props types
  - Local state types
  - Screen-specific interfaces

### Example: CartScreen Module

```
CartScreen/
├── CartScreen.tsx              # UI: Renders cart items, totals
├── types.ts                    # CartSummary, etc.
└── hooks/
    └── useCartScreenLogic.ts   # Logic: Calculations, quantity updates
```

**CartScreen.tsx** (UI):

```typescript
const CartScreen = () => {
  const { cartItems, summary, handleUpdateQuantity, handleRemoveItem } = useCartScreenLogic();

  return (
    // UI rendering
  );
};
```

**useCartScreenLogic.ts** (Logic):

```typescript
export const useCartScreenLogic = () => {
  const cartItems = useAppSelector(state => state.cart.items);
  const dispatch = useAppDispatch();

  const summary = useMemo(() => calculateSummary(cartItems), [cartItems]);

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
  };

  return { cartItems, summary, handleUpdateQuantity, ... };
};
```

## State Management

### Redux Store Structure

```typescript
{
  cart: {
    items: CartItem[]
  },
  products: {
    products: Product[],
    banners: Banner[],
    selectedProduct: Product | null,
    loading: boolean,
    error: string | null
  }
}
```

### Redux Slices

#### cartSlice

- **State**: Shopping cart items
- **Actions**:
  - `addToCart`: Add product to cart
  - `removeFromCart`: Remove product from cart
  - `updateQuantity`: Update item quantity
  - `clearCart`: Clear all cart items

#### productsSlice

- **State**: Products, banners, selected product, loading/error states
- **Async Thunks**:
  - `fetchProducts`: Load all products
  - `fetchBanners`: Load banners
  - `fetchProductById`: Load single product
  - `searchProducts`: Search products by query
- **Actions**:
  - `clearSearch`: Clear search results

### Typed Hooks

The app provides typed Redux hooks for type-safe state access:

```typescript
// src/store/hooks.ts
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
```

## Navigation

### Navigation Stack

The app uses React Navigation with a native stack navigator:

```
Home
  ├── Search
  │     └── ProductDetails
  └── ProductDetails
        └── Cart
              └── CartReview
                    └── Confirmation
```

### Navigation Types

Type-safe navigation is ensured through `RootStackParamList`:

```typescript
export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  CartReview: undefined;
  Confirmation: undefined;
};
```

## Data Flow

### 1. Data Fetching Flow

```
Component → Hook → Redux Thunk → Service → Redux Store → Component
```

**Example: Loading Products**

1. Component mounts and calls hook
2. Hook dispatches `fetchProducts` thunk
3. Thunk calls `productService.getAllProducts()`
4. Service returns data (or mock data)
5. Thunk updates Redux store
6. Component re-renders with new data

### 2. User Action Flow

```
User Interaction → Component → Hook → Redux Action → Store Update → Component Re-render
```

**Example: Adding to Cart**

1. User taps "Add to Cart" button
2. Component calls `handleAddToCart` from hook
3. Hook dispatches `addToCart` action
4. Redux reducer updates cart state
5. Component re-renders with updated cart

### 3. Navigation Flow

```
User Action → Component → Hook → Navigation → New Screen
```

**Example: Viewing Product Details**

1. User taps product card
2. Component calls `handleProductPress` from hook
3. Hook calls `navigation.navigate('ProductDetails', { productId })`
4. Navigation stack pushes new screen

## Component Architecture

### Shared Components

Located in `src/components/`, these are reusable across multiple screens:

- **BannerCarousel**: Displays promotional banners
- **CartButton**: Shows cart icon with item count
- **ProductCard**: Displays product information in a card format

### Component Hierarchy

```
App
└── AppNavigator
    └── Stack Navigator
        ├── HomeScreen
        │   ├── BannerCarousel
        │   └── ProductCard[]
        ├── SearchScreen
        │   └── ProductCard[]
        ├── ProductDetailsScreen
        │   └── ImageSlider
        ├── CartScreen
        │   └── CartItem[]
        ├── CartReviewScreen
        │   └── PaymentMethodSelector
        └── ConfirmationScreen
```

## Future Considerations

### Potential Enhancements

1. **API Integration**: Replace mock data service with real API calls
2. **Error Handling**: Implement comprehensive error boundaries
3. **Offline Support**: Add offline data persistence
4. **Testing**: Expand test coverage for hooks and components
5. **Performance**: Implement code splitting and lazy loading
6. **Accessibility**: Add accessibility labels and support
7. **Internationalization**: Add multi-language support

### Scalability

The current architecture supports:

- Adding new screens following the same pattern
- Extending Redux store with new slices
- Adding new shared components
- Integrating new services and utilities
