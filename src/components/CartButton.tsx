import React, { useMemo } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { FAB } from 'react-native-paper';
import { useAppSelector } from '../store/hooks';

interface CartButtonProps {
  onPress: () => void;
}

export const CartButton: React.FC<CartButtonProps> = React.memo(({ onPress }) => {
  //Get cart items from Redux
  const cartItems = useAppSelector(state => state.cart.items);

  //Calculate total items
  const itemCount = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  }, [cartItems]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.8}>
      <FAB
        icon="cart"
        style={styles.fab}
        onPress={onPress}
        label={itemCount > 0 ? itemCount.toString() : undefined}
      />
    </TouchableOpacity>
  );
});

CartButton.displayName = 'CartButton';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 80,
    backgroundColor: '#6200ee',
  },
});
