export interface CartReviewScreenProps {}

export interface OrderSummary {
  subtotal: number;
  tax: number;
  total: number;
}

export interface PaymentMethodState {
  methods: Array<{ id: string; name: string; icon?: string }>;
  selectedId: string;
  loading: boolean;
}

