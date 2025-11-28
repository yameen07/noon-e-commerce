import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import FastImage from 'react-native-fast-image';
import {
  Text,
  Button,
  RadioButton,
  ActivityIndicator,
  Card,
  Divider,
  Icon,
} from 'react-native-paper';
import { formatCurrency } from '../../utils/formatCurrency';
import { useCartReviewScreenLogic } from './hooks/useCartReviewScreenLogic';

export const CartReviewScreen: React.FC = () => {
  const {
    cartItems,
    paymentMethods,
    selectedPayment,
    loading,
    placingOrder,
    orderSummary,
    handlePlaceOrder,
    handlePaymentMethodChange,
  } = useCartReviewScreenLogic();

  //Render order item
  const renderOrderItem = React.useCallback((item: (typeof cartItems)[0]) => {
    return (
      <Card key={item.product.id} style={styles.orderItem} mode="outlined">
        <Card.Content style={styles.orderItemContent}>
          <FastImage
            source={{ uri: item.product.images[0] }}
            style={styles.orderItemImage}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.orderItemInfo}>
            <Text variant="titleMedium" style={styles.orderItemName} numberOfLines={2}>
              {item.product.name}
            </Text>
            <Text variant="bodyMedium" style={styles.orderItemQuantity}>
              Quantity: {item.quantity}
            </Text>
            <Text variant="titleSmall" style={styles.orderItemPrice}>
              {formatCurrency(item.product.price * item.quantity)}
            </Text>
          </View>
        </Card.Content>
      </Card>
    );
  }, []);

  //Render payment method
  const renderPaymentMethod = React.useCallback((method: (typeof paymentMethods)[0]) => {
    return (
      <View key={method.id} style={styles.paymentMethodItem}>
        <RadioButton value={method.id} />
        {method.icon && (
          <View style={styles.paymentMethodIcon}>
            <Icon source={method.icon} size={24} />
          </View>
        )}
        <Text variant="bodyLarge" style={styles.paymentMethodText}>
          {method.name}
        </Text>
      </View>
    );
  }, []);

  //Loading state
  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  //Render
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Order Summary
        </Text>
        {cartItems.map(renderOrderItem)}
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Payment Method
        </Text>
        <RadioButton.Group onValueChange={handlePaymentMethodChange} value={selectedPayment}>
          {paymentMethods.map(renderPaymentMethod)}
        </RadioButton.Group>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.section}>
        <Text variant="titleLarge" style={styles.sectionTitle}>
          Cost Summary
        </Text>
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Subtotal</Text>
          <Text variant="bodyLarge">{formatCurrency(orderSummary.subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text variant="bodyLarge">Tax (10%)</Text>
          <Text variant="bodyLarge">{formatCurrency(orderSummary.tax)}</Text>
        </View>
        <Divider style={styles.summaryDivider} />
        <View style={styles.summaryRow}>
          <Text variant="titleLarge" style={styles.totalLabel}>
            Total
          </Text>
          <Text variant="titleLarge" style={styles.totalAmount}>
            {formatCurrency(orderSummary.total)}
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          mode="contained"
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
          contentStyle={styles.placeOrderButtonContent}
          loading={placingOrder}
          disabled={placingOrder || !selectedPayment}>
          {placingOrder ? 'Placing Order...' : 'Place Order'}
        </Button>
      </View>
    </ScrollView>
  );
};

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
  section: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    marginBottom: 8,
  },
  orderItemContent: {
    flexDirection: 'row',
    padding: 12,
  },
  orderItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  orderItemInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orderItemName: {
    fontWeight: '600',
    marginBottom: 4,
  },
  orderItemQuantity: {
    color: '#666',
    marginBottom: 4,
  },
  orderItemPrice: {
    color: '#6200ee',
    fontWeight: '600',
  },
  divider: {
    marginVertical: 8,
  },
  paymentMethodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  paymentMethodIcon: {
    marginLeft: 8,
    marginRight: 8,
  },
  paymentMethodText: {
    marginLeft: 0,
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
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  placeOrderButton: {
    backgroundColor: '#6200ee',
  },
  placeOrderButtonContent: {
    paddingVertical: 8,
  },
});
