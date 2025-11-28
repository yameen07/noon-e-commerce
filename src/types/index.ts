export interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  tags?: string[];
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Banner {
  id: string;
  image: string;
  title?: string;
  subtitle?: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon?: string;
}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  ProductDetails: { productId: string };
  Cart: undefined;
  CartReview: undefined;
  Confirmation: undefined;
};

