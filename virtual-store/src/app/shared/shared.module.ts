import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './ui/pagination/pagination.component';
import { ListItemComponent } from './product/listItem/listItem.component';
import { RatingComponent } from './ui/rating/rating.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListItemComponent,
    PaginationComponent,
    RatingComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[[
    ListItemComponent,
    PaginationComponent,
    CommonModule
  ]]
})
export class SharedModule { }
