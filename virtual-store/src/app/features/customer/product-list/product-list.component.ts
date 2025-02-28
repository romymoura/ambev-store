import { Component } from '@angular/core';
import { ProductService } from 'src/app/core/services/product.service';
import { TypeObject } from 'src/app/shared/enums/type-object';
import { ProductAux, Product } from 'src/app/core/models/product.model';
import { CartService } from 'src/app/core/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  columns = ["Image", "Id", "Title", "Price", "Description", "Category", "Rate", "Amount", "Actions"];
  columnsOptConfig = [
    {nameColumn: "Image", aliasColumn: "", type: TypeObject.Image },
    {nameColumn: "Rate", aliasColumn: "", type: TypeObject.Rating },
    {nameColumn: "Amount", aliasColumn: "", type: TypeObject.Amount },
    {nameColumn: "Actions", aliasColumn: "", type: TypeObject.ControllsProfileCustomer }
    //,{nameColumn: "Id", aliasColumn: "", type: TypeObject.HidenField }
  ];
  productList: any[] = [];
  loading = false;
  errorMessage = '';
  infoCart = 'Save and Preview Shopping Cart';

  constructor(private productService: ProductService, private cartService: CartService, private router: Router) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): any {
    this.loading = true;
    this.errorMessage = '';
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.loading = false;
        if (response.success) {
          this.productList = response.data;
        } else {
          this.errorMessage = response.message || 'Authentication failed';
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error?.message || 'An error occurred during login';
      }
    });
  }

  addProductCart(productAux: ProductAux) {
    console.log("Recebido do filho:", productAux);
    const product: Product = {
      id: productAux.id,
      title: productAux.title,
      price: productAux.price,
      description: productAux.description,
      category: productAux.category,
      image: productAux.image,
      rating: { count: productAux.amount, rate: productAux.rate } 
    };
    this.cartService.addToCart(product);
    //TODO: colocar toast no lugar desse alert -> alert('Product added to shopping cart!');
    console.log("Purchase: ", this.cartService.getCartItems());
  }

  onClickPurchase(){
    this.loading = true;
    this.infoCart = "Saving shopping data"
    const shopping =  this.cartService.getCartItems();
    this.cartService.submitCacheCart(shopping).subscribe({
      next: (response: any) => {
        this.infoCart = "Redirecto to preview shopping"
        if (response.success) {
          setTimeout(() => {
            this.loading = false;
            this.router.navigate(['/customer/shopping-cart']);
          }, 1000)
        } else {
          this.loading = false;
          this.errorMessage = response.message || 'Failed add purchase';
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.errorMessage = error.error.message || 'An error occurred during add purchase';
      }
    });
  }
}
