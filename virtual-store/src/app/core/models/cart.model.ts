export interface CartItem {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  valueWithoutDiscount: string;
  discount: string;
  subtotal: string;
  total: string;
}

export interface Cart {
  pay: boolean;
  date: string;
  products: CartItem[];
}

export interface CartCacheChild {
  pay: boolean;
  date: string;
  shopping: CartItem[];
}

export interface CartCacheParent {
  value: CartCacheChild;
}
