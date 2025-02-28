import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product, ProductAux, ProductAuxResponse, ProductResponse } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductAuxResponse> {
    const result = this.http.get<ProductResponse>(this.apiUrl).pipe(
      map((response, index) => ({
        success: response.data.success,
        message: response.data.message,
        errors: response.data.errors,
        data: response.data.data.map(item => ({
          id: item.id,
          title: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          rate: item.rating.rate,
          amount: 1
        }))
      }))
    );
    return result;
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  updateProductQuantity(id: number, quantity: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { count: quantity });
  }
}
