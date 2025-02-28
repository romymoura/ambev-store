import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/models/cart.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {
  cartItems: CartItem[] = [];
  loading = false;
  errorMessage = "";

  constructor(private router: Router,  private cartService: CartService) {}

  ngOnInit(): void{
    this.cartItems = this.cartService.getCartItems();
  }

  getTotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.rating.count, 0);
  }

  goBack(): void {
    this.router.navigate(['/customer/product-list']);
  }

  confirmShopping(): void {
    // //TODO: colocar toast no lugar desse alert -> alert('Compra efetivada com sucesso!');
    this.loading = true;
    this.cartService.submitConfirmShoppingCart().subscribe({
      next: (response: any) => {
        if (response.success) {
          this.errorMessage = 'Shopping success!';
          this.cartService.clearCart();
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/customer/shopping-cart']);
          }, 1000);
        } else {
          this.loading = false;
          this.errorMessage = response.message || 'Failed shopping';
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'An error occurred during add purchase';
      }
    });

  }
}