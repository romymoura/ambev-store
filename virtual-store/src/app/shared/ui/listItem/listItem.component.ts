import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-listItem',
  templateUrl: './listItem.component.html',
  styleUrls: ['./listItem.component.css']
})
export class ListItemComponent{
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
  removeSpecialCharacters(text: string) {
    const result = text.replace(/[^a-zA-Z0-9 ]/g, '');
    return result;
  }

  onPageChange(page: number) {
    this.currentPage = page;
  }

}
