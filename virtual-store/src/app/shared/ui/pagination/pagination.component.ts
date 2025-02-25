import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() totalItems: number = 0; // Total de itens
  @Input() itemsPerPage: number = 5; // Itens por página
  @Input() currentPage: number = 1; // Página atual

  @Output() pageChange = new EventEmitter<number>(); // Evento para mudar a página

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageChange.emit(this.currentPage); // Emite evento para o pai
    }
  }
}
