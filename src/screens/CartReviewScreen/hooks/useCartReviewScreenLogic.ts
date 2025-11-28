import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useAppSelector } from '../../../store/hooks';
import { clearCart } from '../../../store/slices/cartSlice';
import { useAppDispatch } from '../../../store/hooks';
import { productService } from '../../../services/mockData';
import { OrderSummary, PaymentMethodState } from '../types';

type CartReviewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'CartReview'>;

export const useCartReviewScreenLogic = () => {
  const navigation = useNavigation<CartReviewScreenNavigationProp>();
  const dispatch = useAppDispatch();

  //Get cart state from Redux
  const cartItems = useAppSelector(state => state.cart.items);

  //Calculate total price
  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }, [cartItems]);

  //Order state
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  //Payment method state
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethodState['methods']>([]);
  const [selectedPayment, setSelectedPayment] = useState<string>('');
  const [loading, setLoading] = useState(true);

  //Load payment methods
  useEffect(() => {
    const loadPaymentMethods = async () => {
      try {
        const methods = await productService.getPaymentMethods();
        setPaymentMethods(methods);
        if (methods.length > 0) {
          setSelectedPayment(methods[0].id);
        }
      } catch (error) {
        console.error('Error loading payment methods:', error);
        setOrderError('Failed to load payment methods');
      } finally {
        setLoading(false);
      }
    };

    loadPaymentMethods();
  }, []);

  //Calculate order summary
  const orderSummary: OrderSummary = useMemo(() => {
    const subtotal = totalPrice;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + tax;
    return { subtotal, tax, total };
  }, [totalPrice]);

  //Place order
  const handlePlaceOrder = useCallback(async () => {
    if (!selectedPayment) {
      setOrderError('Please select a payment method');
      return;
    }

    setPlacingOrder(true);
    setOrderError(null);

    try {
      const result = await productService.placeOrder();
      if (result.success) {
        dispatch(clearCart());
        navigation.navigate('Confirmation');
      } else {
        setOrderError('Failed to place order');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to place order';
      setOrderError(errorMessage);
    } finally {
      setPlacingOrder(false);
    }
  }, [selectedPayment, dispatch, navigation]);

  //Update selected payment method
  const handlePaymentMethodChange = useCallback((paymentId: string) => {
    setSelectedPayment(paymentId);
  }, []);

  return {
    cartItems,
    paymentMethods,
    selectedPayment,
    loading,
    placingOrder,
    orderSummary,
    handlePlaceOrder,
    handlePaymentMethodChange,
  };
};
