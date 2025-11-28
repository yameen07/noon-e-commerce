import React, { useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Text, Card, Chip } from 'react-native-paper';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatCurrency';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = React.memo(({ product, onPress }) => {
  const renderTag = useCallback(
    (tag: string, index: number) => (
      <Chip key={index} mode="flat" compact style={styles.tag} textStyle={styles.tagText}>
        {tag}
      </Chip>
    ),
    [],
  );

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.touchable}>
      <Card style={styles.card} mode="outlined">
        <Card.Content style={styles.content}>
          <FastImage
            source={{ uri: product.images[0] }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
          <View style={styles.infoContainer}>
            <Text variant="titleSmall" style={styles.name} numberOfLines={2}>
              {product.name}
            </Text>
            <Text variant="titleMedium" style={styles.price}>
              {formatCurrency(product.price)}
            </Text>
            <View style={styles.tagsContainer}>
              {product.tags && product.tags.length > 0
                ? product.tags.slice(0, 2).map(renderTag)
                : null}
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
});

ProductCard.displayName = 'ProductCard';

const styles = StyleSheet.create({
  touchable: {
    width: 180,
    height: 280,
  },
  card: {
    marginHorizontal: 8,
    marginVertical: 4,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  content: {
    padding: 8,
    height: '100%',
    justifyContent: 'space-between',
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    minHeight: 120,
  },
  name: {
    fontWeight: '400',
    marginBottom: 4,
    minHeight: 40,
  },
  price: {
    fontWeight: '600',
    color: '#6200ee',
    marginBottom: 4,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 4,
    marginTop: 4,
    minHeight: 28,
  },
  tag: {
    height: 24,
    backgroundColor: '#e3f2fd',
  },
  tagText: {
    fontSize: 10,
  },
});
