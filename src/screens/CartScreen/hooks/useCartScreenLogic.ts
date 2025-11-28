import { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { updateQuantity, removeFromCart } from '../../../store/slices/cartSlice';
import { CartSummary } from '../types';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export const useCartScreenLogic = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const dispatch = useAppDispatch();

  //Get cart state from Redux
  const cartItems = useAppSelector(state => state.cart.items);

  //Calculate total price
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  //Calculate cart summary
  const cartSummary: CartSummary = useMemo(() => {
    const subtotal = totalPrice;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [totalPrice]);

  //Navigate to checkout
  const handleCheckout = useCallback(() => {
    if (cartItems.length > 0) {
      navigation.navigate('CartReview');
    }
  }, [cartItems.length, navigation]);

  //Update quantity
  const handleQuantityChange = useCallback(
    (productId: string, change: number) => {
      const item = cartItems.find(cartItem => cartItem.product.id === productId);
      if (item) {
        dispatch(updateQuantity({ productId, quantity: item.quantity + change }));
      }
    },
    [cartItems, dispatch],
  );

  //Remove item from cart
  const handleRemove = useCallback(
    (productId: string) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch],
  );

  return {
    cartItems,
    cartSummary,
    handleCheckout,
    handleQuantityChange,
    handleRemove,
  };
};
