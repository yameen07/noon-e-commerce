import { useState, useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { searchProducts, clearSearch } from '../../../store/slices/productsSlice';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

export const useSearchScreenLogic = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const dispatch = useAppDispatch();

  //Get search results from Redux
  const { products: results, loading } = useAppSelector(state => state.products);

  //Search query state
  const [searchQuery, setSearchQuery] = useState('');

  //Handle search input
  const handleSearch = useCallback(
    (query: string) => {
      setSearchQuery(query);
      if (!query.trim()) {
        dispatch(clearSearch());
        return;
      }
      dispatch(searchProducts(query));
    },
    [dispatch],
  );

  //Navigate to product details
  const handleProductPress = useCallback(
    (productId: string) => {
      navigation.navigate('ProductDetails', { productId });
    },
    [navigation],
  );

  return {
    searchQuery,
    results,
    loading,
    handleSearch,
    handleProductPress,
  };
};
