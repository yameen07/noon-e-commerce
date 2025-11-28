import React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, Button, ActivityIndicator, Chip, IconButton } from 'react-native-paper';
import { formatCurrency } from '../../utils/formatCurrency';
import { CartButton } from '../../components/CartButton';
import { useProductDetailsScreenLogic } from './hooks/useProductDetailsScreenLogic';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const ProductDetailsScreen: React.FC = () => {
  const {
    product,
    loading,
    imageIndex,
    quantityInCart,
    handleAddToCart,
    handleIncrement,
    handleDecrement,
    handleCartPress,
    handleImageScroll,
  } = useProductDetailsScreenLogic();

  //Handle image scroll end
  const handleImageScrollEnd = React.useCallback(
    (event: any) => {
      handleImageScroll(event.nativeEvent.contentOffset.x, SCREEN_WIDTH);
    },
    [handleImageScroll],
  );

  //Render product image
  const renderProductImage = React.useCallback(
    (image: string, index: number) => (
      <FastImage
        key={index}
        source={{ uri: image }}
        style={styles.productImage}
        resizeMode={FastImage.resizeMode.cover}
      />
    ),
    [],
  );

  //Render image indicator
  const renderImageIndicator = React.useCallback(
    (_: any, index: number) => (
      <View
        key={index}
        style={[styles.imageIndicator, imageIndex === index && styles.activeImageIndicator]}
      />
    ),
    [imageIndex],
  );

  //Render tag
  const renderTag = React.useCallback(
    (tag: string, index: number) => (
      <Chip key={index} mode="flat" style={styles.tag}>
        {tag}
      </Chip>
    ),
    [],
  );

  //Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //Product not found state
  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text>Product not found</Text>
      </View>
    );
  }

  //Render
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleImageScrollEnd}
          style={styles.imageScrollView}>
          {product.images.map(renderProductImage)}
        </ScrollView>

        {product.images.length > 1 && (
          <View style={styles.imageIndicatorContainer}>
            {product.images.map(renderImageIndicator)}
          </View>
        )}

        <View style={styles.content}>
          <Text variant="headlineMedium" style={styles.productName}>
            {product.name}
          </Text>
          <Text variant="headlineSmall" style={styles.price}>
            {formatCurrency(product.price)}
          </Text>

          {product.tags && product.tags.length > 0 && (
            <View style={styles.tagsContainer}>{product.tags.map(renderTag)}</View>
          )}

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Description
            </Text>
            <Text variant="bodyMedium" style={styles.description}>
              {product.description}
            </Text>
          </View>

          {quantityInCart > 0 && (
            <View style={styles.cartInfo}>
              <Text variant="bodyMedium">
                {quantityInCart} item{quantityInCart > 1 ? 's' : ''} in cart
              </Text>
            </View>
          )}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {quantityInCart > 0 ? (
          <View style={styles.quantityControls}>
            <IconButton
              icon="minus"
              size={24}
              onPress={handleDecrement}
              style={styles.quantityButton}
              iconColor="#6200ee"
            />
            <Text variant="titleLarge" style={styles.quantityText}>
              {quantityInCart}
            </Text>
            <IconButton
              icon="plus"
              size={24}
              onPress={handleIncrement}
              style={styles.quantityButton}
              iconColor="#6200ee"
            />
          </View>
        ) : (
          <Button
            mode="contained"
            onPress={handleAddToCart}
            style={styles.addButton}
            contentStyle={styles.buttonContent}>
            Add to Cart
          </Button>
        )}
      </View>

      <CartButton onPress={handleCartPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  imageScrollView: {
    height: 300,
  },
  productImage: {
    width: SCREEN_WIDTH,
    height: 300,
  },
  imageIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 8,
  },
  imageIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
  },
  activeImageIndicator: {
    backgroundColor: '#6200ee',
    width: 24,
  },
  content: {
    padding: 16,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontWeight: 'bold',
    color: '#6200ee',
    marginBottom: 16,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  tag: {
    backgroundColor: '#e3f2fd',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    lineHeight: 22,
    color: '#666',
  },
  cartInfo: {
    padding: 12,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  addButton: {
    backgroundColor: '#6200ee',
  },
  buttonContent: {
    paddingVertical: 8,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  quantityButton: {
    backgroundColor: '#f5f5f5',
  },
  quantityText: {
    minWidth: 40,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#6200ee',
  },
});
