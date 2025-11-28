export interface HomeScreenProps {}

export interface ProductCarousel {
  title: string;
  products: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    tags?: string[];
    category: string;
  }>;
}

export interface HomeScreenData {
  type: 'banner' | 'carousel';
  data?: Array<{ id: string; image: string; title?: string; subtitle?: string }>;
  title?: string;
  products?: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    tags?: string[];
    category: string;
  }>;
}

