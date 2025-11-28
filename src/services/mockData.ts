import { Product, Banner, PaymentMethod } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    price: 299.99,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500',
      'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
    ],
    description: 'Premium wireless headphones with noise cancellation and 30-hour battery life.',
    tags: ['Free Delivery', 'Selling Fast'],
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    price: 499.99,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
      'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500',
    ],
    description: 'Advanced smartwatch with health tracking and GPS.',
    tags: ['Free Delivery'],
    category: 'Electronics',
  },
  {
    id: '3',
    name: 'Laptop Stand Aluminum',
    price: 89.99,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500',
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    ],
    description: 'Ergonomic aluminum laptop stand for better posture.',
    tags: ['Selling Fast'],
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard RGB',
    price: 149.99,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
      'https://images.unsplash.com/photo-1618384887929-16ec33cab9ef?w=500',
    ],
    description: 'RGB mechanical keyboard with customizable keys.',
    tags: ['Free Delivery', 'Selling Fast'],
    category: 'Electronics',
  },
  {
    id: '5',
    name: 'Wireless Mouse',
    price: 49.99,
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500',
    ],
    description: 'Ergonomic wireless mouse with precision tracking.',
    tags: ['Free Delivery'],
    category: 'Accessories',
  },
  {
    id: '6',
    name: 'USB-C Hub',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1587825147138-346c006f4f98?w=500'],
    description: 'Multi-port USB-C hub with HDMI and card reader.',
    tags: ['Selling Fast'],
    category: 'Accessories',
  },
];

export const mockBanners: Banner[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800',
    title: 'Summer Sale',
    subtitle: 'Up to 50% off on Electronics',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    title: 'New Arrivals',
    subtitle: 'Check out our latest products',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=800',
    title: 'Free Delivery',
    subtitle: 'On orders over $100',
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: '1',
    name: 'Credit/Debit Card',
    icon: 'credit-card',
  },
  {
    id: '2',
    name: 'Cash on Delivery',
    icon: 'cash',
  },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const productService = {
  getAllProducts: async (): Promise<Product[]> => {
    await delay(800);
    return mockProducts;
  },

  getProductById: async (id: string): Promise<Product | null> => {
    await delay(500);
    return mockProducts.find(p => p.id === id) || null;
  },

  searchProducts: async (query: string): Promise<Product[]> => {
    await delay(600);
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(
      p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery),
    );
  },

  getBanners: async (): Promise<Banner[]> => {
    await delay(400);
    return mockBanners;
  },

  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await delay(300);
    return mockPaymentMethods;
  },

  placeOrder: async (): Promise<{ success: boolean; orderId: string }> => {
    await delay(1500);
    return {
      success: true,
      orderId: `ORD-${Date.now()}`,
    };
  },
};
