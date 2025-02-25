import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
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

  addToCart(product: Product, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItemIndex = currentItems.findIndex(item => item.productId === product.id);

    if (existingItemIndex >= 0) {
      currentItems[existingItemIndex].quantity += quantity;
    } else {
      currentItems.push({
        productId: product.id,
        quantity: quantity,
        pay: false
      });
    }

    this.cartItemsSubject.next([...currentItems]);
    localStorage.setItem('cart', JSON.stringify(currentItems));
  }

  updateCartItem(productId: number, quantity: number): void {
    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(item => item.productId === productId);

    if (itemIndex >= 0) {
      currentItems[itemIndex].quantity = quantity;
      this.cartItemsSubject.next([...currentItems]);
      localStorage.setItem('cart', JSON.stringify(currentItems));
    }
  }

  removeFromCart(productId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.productId !== productId);

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

  submitCart(userId: string): Observable<any> {
    const cart: Cart = {
      id: 0,
      userId: userId,
      date: new Date().toISOString(),
      products: this.cartItemsSubject.value.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        pay: true
      }))
    };

    return this.http.post(this.apiUrl, cart);
  }

  getUserCarts(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.apiUrl}/user/${userId}`);
  }

  getAllCarts(): Observable<Cart[]> {
    return this.http.get<Cart[]>(this.apiUrl);
  }

  setItemPaid(productId: number, paid: boolean): void {
    const currentItems = this.cartItemsSubject.value;
    const itemIndex = currentItems.findIndex(item => item.productId === productId);

    if (itemIndex >= 0) {
      currentItems[itemIndex].pay = paid;
      this.cartItemsSubject.next([...currentItems]);
      localStorage.setItem('cart', JSON.stringify(currentItems));
    }
  }
}
