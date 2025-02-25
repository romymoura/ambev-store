import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { ListProductComponent } from './list-product/list-product.component';


const routes: Routes = [
  { path: 'list', component: ListProductComponent, canActivate: [AuthGuard] }
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
