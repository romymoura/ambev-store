import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: 'product-list', component: ProductListComponent },
  { path: 'shopping-cart', component: ShoppingComponent }
];

@NgModule({
  declarations: [
    ProductListComponent,
    ShoppingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerModule { }
