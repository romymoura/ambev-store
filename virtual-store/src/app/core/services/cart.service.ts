import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem, CartCacheParent } from '../models/cart.model';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = `${environment.apiUrl}/carts`;
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  private selectedProductsSubject = new BehaviorSubject<Product[]>([]);
  selectedProducts$ = this.selectedProductsSubject.asObservable();

  constructor(private http: HttpClient) {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItemsSubject.next(JSON.parse(savedCart));
    }
  }

  setSelectedProducts(products: Product[]): void {
    this.selectedProductsSubject.next(products);
  }

  getSelectedProducts(): Product[] {
    return this.selectedProductsSubject.value;
  }

  addToCart(product: Product): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex >= 0) {
      currentItems[existingItemIndex].rating.count += product.rating.count;
      currentItems[existingItemIndex].rating.rate = product.rating.rate;
    } else {
      currentItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
        rating: {
          rate: product.rating.rate,
          count: product.rating.count
        },
        discount: ((product.rating.count > 4 && product.rating.count < 10) ? '0.10%' : (product.rating.count >= 10 && product.rating.count <= 20) ? '0.20%' : '0.00%'),
        subtotal: ((product.price * product.rating.count) - ((product.rating.count > 4 && product.rating.count < 10) ?
          ((product.price * product.rating.count) * 0.10 * 100 / 100) :
          (product.rating.count >= 10 && product.rating.count <= 20) ?
          ((product.price * product.rating.count) * 0.12 * 100 / 100) : 0)).toFixed(2),
        total: ((product.price * product.rating.count) - ((product.rating.count > 4 && product.rating.count < 10) ?
        ((product.price * product.rating.count) * 0.10 * 100 / 100) :
        (product.rating.count >= 10 && product.rating.count <= 20) ?
        ((product.price * product.rating.count) * 0.20 * 100 / 100) : 0)).toFixed(2),
         valueWithoutDiscount: (product.price * product.rating.count).toFixed(2)
      });
    }

    this.cartItemsSubject.next([...currentItems]);
    localStorage.setItem('cart', JSON.stringify(currentItems));
  }

  updateCartItem(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex((item: any) => item.id === productId);

    if (itemIndex >= 0) {
      currentItems[itemIndex].rating.count = quantity;
      this.cartItemsSubject.next([...currentItems]);
      localStorage.setItem('cart', JSON.stringify(currentItems));
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter((item: any) => item.id !== productId);

    this.cartItemsSubject.next(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cart');
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  submitCacheCart(shopping: CartItem[]): Observable<any> {
    const cart: CartCacheParent = {
      value: {
        pay: false,
        date: new Date().toISOString(),
        shopping: shopping
      }
    };
    return this.http.post(this.apiUrl, cart);
  }

  submitConfirmShoppingCart(): Observable<any> {
    return this.http.post(`${this.apiUrl}/shopping-payments`, {});
  }

  getUserCarts(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }
}
