import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useConfirmationScreenLogic } from './hooks/useConfirmationScreenLogic';

export const ConfirmationScreen: React.FC = () => {
  const { handleBackToHome } = useConfirmationScreenLogic();

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.checkmark}>✓</Text>
        </View>
        <Text variant="headlineMedium" style={styles.title}>
          Order Placed Successfully!
        </Text>
        <Text variant="bodyLarge" style={styles.message}>
          Thank you for your purchase. Your order has been confirmed and will be processed shortly.
        </Text>
        <Button
          mode="contained"
          onPress={handleBackToHome}
          style={styles.button}
          contentStyle={styles.buttonContent}>
          Back to Home
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  content: {
    alignItems: 'center',
    maxWidth: 400,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  checkmark: {
    fontSize: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  message: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    backgroundColor: '#6200ee',
    minWidth: 200,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
