import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen/SearchScreen';
import { ProductDetailsScreen } from '../screens/ProductDetailsScreen/ProductDetailsScreen';
import { CartScreen } from '../screens/CartScreen/CartScreen';
import { CartReviewScreen } from '../screens/CartReviewScreen/CartReviewScreen';
import { ConfirmationScreen } from '../screens/ConfirmationScreen/ConfirmationScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Noon E-commerce' }} />
        <Stack.Screen
          name="Search"
          component={SearchScreen}
          options={{ title: 'Search Products' }}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetailsScreen}
          options={{ title: 'Product Details' }}
        />
        <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Shopping Cart' }} />
        <Stack.Screen
          name="CartReview"
          component={CartReviewScreen}
          options={{ title: 'Review Order' }}
        />
        <Stack.Screen
          name="Confirmation"
          component={ConfirmationScreen}
          options={{
            title: 'Order Confirmation',
            headerBackVisible: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
