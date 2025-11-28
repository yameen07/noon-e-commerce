import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Text, ActivityIndicator } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { ProductCard } from '../../components/ProductCard';
import { useSearchScreenLogic } from './hooks/useSearchScreenLogic';

export const SearchScreen: React.FC = () => {
  const { searchQuery, results, loading, handleSearch, handleProductPress } =
    useSearchScreenLogic();

  //Render product item
  const renderItem = useCallback(
    ({ item }: { item: (typeof results)[0] }) => {
      const handleCardPress = () => {
        handleProductPress(item.id);
      };
      return <ProductCard product={item} onPress={handleCardPress} />;
    },
    [handleProductPress],
  );

  const extractProductKey = useCallback((item: (typeof results)[0]) => item.id, []);

  const renderItemSeparator = useCallback(() => <View style={styles.itemSeparator} />, []);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search products..."
        onChangeText={handleSearch}
        value={searchQuery}
        style={styles.searchbar}
      />
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlashList
          data={results}
          renderItem={renderItem}
          keyExtractor={extractProductKey}
          numColumns={2}
          estimatedItemSize={280}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          ItemSeparatorComponent={renderItemSeparator}
          ListEmptyComponent={
            searchQuery ? (
              <View style={styles.centerContainer}>
                <Text variant="bodyLarge">No products found</Text>
              </View>
            ) : (
              <View style={styles.centerContainer}>
                <Text variant="bodyLarge" style={styles.placeholderText}>
                  Start typing to search for products
                </Text>
              </View>
            )
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
  },
  searchbar: {
    marginVertical: 16,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 8,
  },
  itemSeparator: {
    height: 12,
  },
  placeholderText: {
    color: '#999',
  },
});
