import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from '../user/create-user/create-user.component';


const routes: Routes = [
  { path: 'create-account', component: CreateUserComponent }
];

@NgModule({
  declarations: [
    CreateUserComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class UserModule { }
