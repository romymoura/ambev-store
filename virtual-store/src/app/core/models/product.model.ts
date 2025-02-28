export interface Product {
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
}
export interface ProductResponse {
  data: {
    data: Product[];
    success: boolean;
    message: string;
    errors: string[];
  };
  success: boolean;
  message: string;
  errors: string[];
}


export interface ProductAux {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rate: number;
  amount: number;
}

export interface ProductAuxResponse {
  data: ProductAux[];
  success: boolean;
  message: string;
  errors: string[];
}
