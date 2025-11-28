import { useState, useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../types';
import { useAppSelector, useAppDispatch } from '../../../store/hooks';
import { searchProducts, clearSearch } from '../../../store/slices/productsSlice';
import { debounce } from '../../../utils/debounce';

type SearchScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Search'>;

// Debounce delay for search (300ms)
const SEARCH_DEBOUNCE_DELAY = 300;

export const useSearchScreenLogic = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const dispatch = useAppDispatch();

  //Get search results from Redux
  const { products: results, loading } = useAppSelector(state => state.products);

  //Search query state
  const [searchQuery, setSearchQuery] = useState('');

  // Create debounced search function
  const debouncedSearchRef = useRef(
    debounce((query: string) => {
      if (!query.trim()) {
        dispatch(clearSearch());
        return;
      }
      dispatch(searchProducts(query));
    }, SEARCH_DEBOUNCE_DELAY),
  );

  //Handle search input
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    debouncedSearchRef.current(query);
  }, []);

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
