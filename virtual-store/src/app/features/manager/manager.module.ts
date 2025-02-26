import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClientsPurchasesComponent } from './clients-purchases/clients-purchases.component';


const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'clients-purchases', component: ClientsPurchasesComponent },
];

@NgModule({
  declarations: [
    UserListComponent,
    ClientsPurchasesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ManagerModule { }
