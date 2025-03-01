import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { CartItem } from 'src/app/core/models/cart.model';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit, AfterViewChecked {
  cartItems: CartItem[] = [];
  cartItemsCopy: CartItem[] = [];
  loading = false;
  errorMessage: string | null = "";
  btnPayIsOk = false;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }
  ngAfterViewChecked(): void {
    this.btnPayIsOk = this.getTotalWithoutDiscount() > 0
  }

  getTotalWithoutDiscount(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.rating.count, 0);
  }
  getTotalWithDiscount(): number {
    return this.cartItems.reduce((total, item) => total + Number(item.subtotal), 0);
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
            this.router.navigate(['/customer/product-list']);
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

  economy(): number {
    return (this.getTotalWithoutDiscount() - this.getTotalWithDiscount());
  }
}
