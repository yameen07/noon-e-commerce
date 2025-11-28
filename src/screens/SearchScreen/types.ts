export interface SearchScreenProps {}

export interface SearchState {
  query: string;
  results: Array<{
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    tags?: string[];
    category: string;
  }>;
  loading: boolean;
}

