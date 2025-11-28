import React from 'react';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { Text, ActivityIndicator, IconButton } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Product } from '../../types';
import { BannerCarousel } from '../../components/BannerCarousel';
import { ProductCard } from '../../components/ProductCard';
import { CartButton } from '../../components/CartButton';
import { useHomeScreenLogic } from './hooks/useHomeScreenLogic';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const {
    loading,
    refreshing,
    screenData,
    onRefresh,
    handleProductPress,
    handleCartPress,
    handleSearchPress,
  } = useHomeScreenLogic();

  // Render header right button
  const renderHeaderRight = React.useCallback(
    () => <IconButton icon="magnify" iconColor="#fff" onPress={handleSearchPress} />,
    [handleSearchPress],
  );

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: renderHeaderRight,
    });
  }, [navigation, renderHeaderRight]);

  //Render product card
  const renderProductCard = React.useCallback(
    (product: Product) => {
      const handleCardPress = () => {
        handleProductPress(product.id);
      };
      return <ProductCard product={product} onPress={handleCardPress} />;
    },
    [handleProductPress],
  );

  //Extract product key
  const extractProductKey = React.useCallback((product: Product) => product.id, []);

  const renderItemSeparator = React.useCallback(() => <View style={styles.itemSeparator} />, []);

  //Render product carousel
  const renderProductCarousel = React.useCallback(
    (title: string, productList: Product[] | undefined) => {
      if (!productList || !productList.length) return null;

      return (
        <View style={styles.carouselSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            {title}
          </Text>
          <FlashList
            data={productList}
            renderItem={({ item }) => renderProductCard(item)}
            keyExtractor={extractProductKey}
            horizontal
            estimatedItemSize={288}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContent}
            ItemSeparatorComponent={renderItemSeparator}
          />
        </View>
      );
    },
    [renderProductCard, extractProductKey, renderItemSeparator],
  );

  //Render screen item
  const renderScreenItem = React.useCallback(
    ({ item }: { item: (typeof screenData)[0] }) => {
      if (item.type === 'banner') {
        return <BannerCarousel banners={item.data || []} />;
      }
      return renderProductCarousel(item.title || '', item.products);
    },
    [renderProductCarousel],
  );

  //Extract screen item key
  const extractScreenItemKey = React.useCallback(
    (item: (typeof screenData)[0], index: number) => `${item.type}-${index}`,
    [],
  );

  //Loading state
  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlashList
        data={screenData}
        renderItem={renderScreenItem}
        keyExtractor={extractScreenItemKey}
        estimatedItemSize={400}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text>No products available</Text>
          </View>
        }
        contentContainerStyle={styles.listContent}
      />
      <CartButton onPress={handleCartPress} />
    </View>
  );
};

export { useHomeScreenLogic };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselSection: {
    marginVertical: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginHorizontal: 16,
    marginBottom: 12,
  },
  carouselContent: {
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  itemSeparator: {
    width: 12,
  },
  listContent: {
    paddingBottom: 100,
  },
});
