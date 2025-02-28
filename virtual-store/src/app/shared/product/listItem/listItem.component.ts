import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TypeObject } from '../../enums/type-object';

@Component({
  selector: 'app-listItem',
  templateUrl: './listItem.component.html',
  styleUrls: ['./listItem.component.css']
})
export class ListItemComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() itemsPerPage = 5;
  @Input() currentPage = 1;
  @Input() visibleTop = true;
  @Input() visibleBotton = true;
  @Input() columns: any[] = []; // Header
  @Input() columnsOptConfig: any[] = [];
  @Output() addProductCartEvent: EventEmitter<any> = new EventEmitter();


  typesObject = TypeObject;

  constructor() { }
  ngOnInit(){}

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

  getType(index: number): TypeObject {
    const colConfigDescription = this.columns[index];
    const colConfig = this.columnsOptConfig.find(x => x.nameColumn === colConfigDescription);
    const result = colConfig?.type ?? TypeObject.Text;
    return result;
  }

  onClickAddProductInCart(selectedIndex: any){
    const itemsSelected = this.paginatedItems;
    const itemSelected =  itemsSelected.find(x => x.id === selectedIndex.id);
    this.addProductCartEvent.emit(itemSelected);
  }

  updateValue(item: any, input: any, property: string) {
    const value = (input as HTMLInputElement).value ?? 1;
    item[property] = Number(value);
  }

}


