import { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { fetchProducts, fetchBanners } from '../../../store/slices/productsSlice';
import { HomeScreenData } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const useHomeScreenLogic = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const dispatch = useAppDispatch();

  //Get products and banners from Redux
  const { products, banners, loading } = useAppSelector(state => state.products);

  //Refresh state
  const [refreshing, setRefreshing] = useState(false);

  //Load data on mount
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchBanners());
  }, [dispatch]);

  //Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchProducts());
    dispatch(fetchBanners());
    // Reset refreshing after a short delay
    setTimeout(() => setRefreshing(false), 500);
  }, [dispatch]);

  //Filter products by tags
  const featuredProducts = useMemo(
    () => products.filter(p => p.tags?.includes('Selling Fast')),
    [products],
  );

  const freeDeliveryProducts = useMemo(
    () => products.filter(p => p.tags?.includes('Free Delivery')),
    [products],
  );

  //Prepare screen data
  const screenData: HomeScreenData[] = useMemo(
    () => [
      { type: 'banner', data: banners },
      { type: 'carousel', title: 'Selling Fast', products: featuredProducts },
      { type: 'carousel', title: 'Free Delivery', products: freeDeliveryProducts },
      { type: 'carousel', title: 'All Products', products: products },
    ],
    [banners, featuredProducts, freeDeliveryProducts, products],
  );

  const handleProductPress = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetails', { productId });
    },
    [navigation],
  );

  const handleCartPress = useCallback(() => {
    navigation.navigate('Cart');
  }, [navigation]);

  const handleSearchPress = useCallback(() => {
    navigation.navigate('Search');
  }, [navigation]);

  return {
    products,
    banners,
    loading,
    refreshing,
    screenData,
    featuredProducts,
    freeDeliveryProducts,
    onRefresh,
    handleProductPress,
    handleCartPress,
    handleSearchPress,
  };
};
