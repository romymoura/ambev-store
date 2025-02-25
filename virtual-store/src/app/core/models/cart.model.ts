export interface CartItem {
  productId: number;
  quantity: number;
  pay: boolean;
}

export interface Cart {
  id: number;
  userId: string;
  date: string;
  products: CartItem[];
}
