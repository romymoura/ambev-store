import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { ListItemComponent } from './ui/listItem/listItem.component';


@NgModule({
  declarations: [
    ListItemComponent,
    PaginationComponent
  ],
  imports: [CommonModule],
  exports:[[
    ListItemComponent,
    PaginationComponent,
    CommonModule
  ]]
})
export class SharedModule { }
