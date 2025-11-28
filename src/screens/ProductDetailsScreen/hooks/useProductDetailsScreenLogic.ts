import { useEffect, useState, useCallback, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { addToCart, updateQuantity } from '../../../store/slices/cartSlice';
import { fetchProductById } from '../../../store/slices/productsSlice';
import { throttle } from '../../../utils/debounce';

type ProductDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ProductDetails'>;
type ProductDetailsScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'ProductDetails'
>;

export const useProductDetailsScreenLogic = () => {
  const route = useRoute<ProductDetailsScreenRouteProp>();
  const navigation = useNavigation<ProductDetailsScreenNavigationProp>();
  const dispatch = useAppDispatch();
  const { productId } = route.params;

  //Get product from store
  const selectedProduct = useAppSelector(state => state.products.selectedProduct);
  const loading = useAppSelector(state => state.products.loading);

  //Get cart items to calculate quantity
  const cartItems = useAppSelector(state => state.cart.items);

  //Image slider state
  const [imageIndex, setImageIndex] = useState(0);

  //Load product on mount
  useEffect(() => {
    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  //Get quantity in cart
  const quantityInCart = selectedProduct
    ? cartItems.find(item => item.product.id === selectedProduct.id)?.quantity || 0
    : 0;

  //Add product to cart
  const handleAddToCart = useCallback(() => {
    if (selectedProduct) {
      dispatch(addToCart({ product: selectedProduct, quantity: 1 }));
    }
  }, [selectedProduct, dispatch]);

  // Keep latest values in refs for throttle
  const selectedProductRef = useRef(selectedProduct);
  const quantityInCartRef = useRef(quantityInCart);
  selectedProductRef.current = selectedProduct;
  quantityInCartRef.current = quantityInCart;

  // Throttled increment handler (300ms to prevent rapid clicks)
  const handleIncrementThrottled = useRef(
    throttle(() => {
      if (selectedProductRef.current) {
        dispatch(
          updateQuantity({
            productId: selectedProductRef.current.id,
            quantity: quantityInCartRef.current + 1,
          }),
        );
      }
    }, 300),
  );

  //Increment quantity
  const handleIncrement = useCallback(() => {
    handleIncrementThrottled.current();
  }, []);

  // Throttled decrement handler (300ms to prevent rapid clicks)
  const handleDecrementThrottled = useRef(
    throttle(() => {
      if (selectedProductRef.current && quantityInCartRef.current > 0) {
        dispatch(
          updateQuantity({
            productId: selectedProductRef.current.id,
            quantity: quantityInCartRef.current - 1,
          }),
        );
      }
    }, 300),
  );

  //Decrement quantity
  const handleDecrement = useCallback(() => {
    handleDecrementThrottled.current();
  }, []);

  //Navigate to cart
  const handleCartPress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  //Handle image scroll
  const handleImageScroll = useCallback((contentOffsetX: number, screenWidth: number) => {
    const index = Math.round(contentOffsetX / screenWidth);
    setImageIndex(index);
  }, []);

  return {
    product: selectedProduct,
    loading,
    imageIndex,
    quantityInCart,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleCartPress,
    handleImageScroll,
  };
};
