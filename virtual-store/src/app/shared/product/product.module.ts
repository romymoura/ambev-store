import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListProductComponent } from './list.product/list.product.component';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  { path: 'list-product', component: ListProductComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [
    ListProductComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProductModule { }
