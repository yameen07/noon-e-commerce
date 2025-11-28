import React, { useState, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
} from 'react-native';
import { FlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import { Banner } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_HEIGHT = 200;

interface BannerCarouselProps {
  banners: Banner[];
}

export const BannerCarousel: React.FC<BannerCarouselProps> = React.memo(({ banners }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / SCREEN_WIDTH);
    setActiveIndex(index);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Banner }) => (
      <View style={styles.bannerContainer}>
        <FastImage
          source={{ uri: item.image }}
          style={styles.bannerImage}
          resizeMode={FastImage.resizeMode.cover}
        />
        <View style={styles.textOverlay}>
          {item.title && <Text style={styles.title}>{item.title}</Text>}
          {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
        </View>
      </View>
    ),
    [],
  );

  const keyExtractor = useCallback((item: Banner) => item.id, []);

  if (!banners.length) return null;

  return (
    <View style={styles.container}>
      <FlashList
        data={banners}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        horizontal
        estimatedItemSize={SCREEN_WIDTH}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        snapToInterval={SCREEN_WIDTH}
        decelerationRate="fast"
      />
      <View style={styles.indicatorContainer}>
        {banners.map((_, index) => (
          <View
            key={index}
            style={[styles.indicator, activeIndex === index && styles.activeIndicator]}
          />
        ))}
      </View>
    </View>
  );
});

BannerCarousel.displayName = 'BannerCarousel';

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    marginBottom: 16,
  },
  bannerContainer: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
    position: 'relative',
  },
  bannerImage: {
    width: SCREEN_WIDTH,
    height: BANNER_HEIGHT,
  },
  textOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: '#fff',
    width: 24,
  },
});
