import React, { useCallback } from 'react';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, Button, IconButton, Card, Divider } from 'react-native-paper';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartScreenLogic } from './hooks/useCartScreenLogic';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export const CartScreen: React.FC = () => {
  const navigation = useNavigation<CartScreenNavigationProp>();

  const { cartItems, cartSummary, handleCheckout, handleQuantityChange, handleRemove } =
    useCartScreenLogic();

  //Handle decrease quantity
  const handleDecreaseQuantity = useCallback(
    (productId: string) => {
      handleQuantityChange(productId, -1);
    },
    [handleQuantityChange],
  );

  //Handle increase quantity
  const handleIncreaseQuantity = useCallback(
    (productId: string) => {
      handleQuantityChange(productId, 1);
    },
    [handleQuantityChange],
  );

  //Render cart item
  const renderItem = useCallback(
    ({ item }: { item: (typeof cartItems)[0] }) => {
      const handleDecrease = () => handleDecreaseQuantity(item.product.id);
      const handleIncrease = () => handleIncreaseQuantity(item.product.id);
      const handleDelete = () => handleRemove(item.product.id);

      return (
        <Card style={styles.cartItem} mode="outlined">
          <Card.Content style={styles.cartItemContent}>
            <FastImage
              source={{ uri: item.product.images[0] }}
              style={styles.cartItemImage}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View style={styles.cartItemInfo}>
              <Text variant="titleMedium" style={styles.cartItemName} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text variant="titleSmall" style={styles.cartItemPrice}>
                {formatCurrency(item.product.price)}
              </Text>
              <View style={styles.quantityContainer}>
                <IconButton
                  icon="minus"
                  size={20}
                  onPress={handleDecrease}
                  disabled={item.quantity <= 1}
                />
                <Text variant="titleMedium" style={styles.quantity}>
                  {item.quantity}
                </Text>
                <IconButton icon="plus" size={20} onPress={handleIncrease} />
              </View>
            </View>
            <IconButton icon="delete" size={24} onPress={handleDelete} iconColor="#f44336" />
          </Card.Content>
        </Card>
      );
    },
    [handleDecreaseQuantity, handleIncreaseQuantity, handleRemove],
  );

  //Extract cart item key
  const extractCartItemKey = useCallback((item: (typeof cartItems)[0]) => item.product.id, []);

  //Render item separator
  const renderItemSeparator = useCallback(() => <Divider />, []);

  //Handle continue shopping
  const handleContinueShopping = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);

  //Empty cart state
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineSmall" style={styles.emptyText}>
          Your cart is empty
        </Text>
        <Button mode="contained" onPress={handleContinueShopping} style={styles.emptyButton}>
          Continue Shopping
        </Button>
      </View>
    );
  }

  //Render cart with items
  return (
    <View style={styles.container}>
      <FlashList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={extractCartItemKey}
        estimatedItemSize={150}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={renderItemSeparator}
      />
      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Subtotal</Text>
          <Text variant="bodyLarge">{formatCurrency(cartSummary.subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Tax (10%)</Text>
          <Text variant="bodyLarge">{formatCurrency(cartSummary.tax)}</Text>
        </View>
        <Divider style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text variant="titleLarge" style={styles.totalLabel}>
            Total
          </Text>
          <Text variant="titleLarge" style={styles.totalAmount}>
            {formatCurrency(cartSummary.total)}
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={handleCheckout}
          style={styles.checkoutButton}
          contentStyle={styles.checkoutButtonContent}>
          Checkout
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 16,
  },
  cartItem: {
    marginBottom: 8,
  },
  cartItemContent: {
    flexDirection: 'row',
    padding: 12,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  cartItemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemPrice: {
    color: '#6200ee',
    fontWeight: '600',
    marginBottom: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  quantity: {
    minWidth: 30,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: '#6200ee',
  },
  summary: {
    backgroundColor: '#fff',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  summaryDivider: {
    marginVertical: 12,
  },
  totalLabel: {
    fontWeight: 'bold',
  },
  totalAmount: {
    fontWeight: 'bold',
    color: '#6200ee',
  },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#6200ee',
  },
  checkoutButtonContent: {
    paddingVertical: 8,
  },
});
