import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemsComponent } from './product/product-items/product-items.component';
import { PaginationComponent } from './ui/pagination/pagination.component';


@NgModule({
  declarations: [
    ProductItemsComponent,
    PaginationComponent
  ],
  imports: [CommonModule],
  exports:[[
    ProductItemsComponent,
    PaginationComponent,
    CommonModule
  ]]
})
export class SharedModule { }
