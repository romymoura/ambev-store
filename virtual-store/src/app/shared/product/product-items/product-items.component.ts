import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-items',
  templateUrl: './product-items.component.html',
  styleUrls: ['./product-items.component.css']
})
export class ProductItemsComponent{
  @Input() items: any[] = [];
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;
  @Input() visibleTop = true;
  @Input() visibleBotton = true;
  @Input() columns: any[] = [];

  constructor() { }

  get paginatedItems() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(start, start + this.itemsPerPage);
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }
}
