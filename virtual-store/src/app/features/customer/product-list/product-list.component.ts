import { Component } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  columns = ['Id', 'Name', 'Price'];
  productList = [
    { id: 1, name: 'Produto A', price: 100 },
    { id: 2, name: 'Produto B', price: 200 },
    { id: 3, name: 'Produto C', price: 300 },
    { id: 4, name: 'Produto D', price: 400 },
    { id: 5, name: 'Produto E', price: 500 },
    { id: 6, name: 'Produto F', price: 600 },
    { id: 7, name: 'Produto G', price: 700 }
  ];
}
