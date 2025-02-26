import { Component } from '@angular/core';

@Component({
  selector: 'app-clients-purchases',
  templateUrl: './clients-purchases.component.html',
  styleUrls: ['./clients-purchases.component.scss']
})
export class ClientsPurchasesComponent {
  columns = ['Id', 'Username', 'Product Name', 'Value', 'Amount', 'Total'];
  clientPurchasesList = [
    { id: 1, username: 'Produto A', productname: 'teste@teste.com', value: '11 12345-6789', amount: 'Customer', total: 'R$ 50,00' },
    { id: 2, username: 'Produto A', productname: 'teste@teste.com', value: '11 12345-6789', amount: 'Customer', total: 'R$ 50,00' },
    { id: 3, username: 'Produto A', productname: 'teste@teste.com', value: '11 12345-6789', amount: 'Customer', total: 'R$ 50,00' },
    { id: 3, username: 'Produto A', productname: 'teste@teste.com', value: '11 12345-6789', amount: 'Customer', total: 'R$ 50,00' },
    { id: 5, username: 'Produto A', productname: 'teste@teste.com', value: '11 12345-6789', amount: 'Customer', total: 'R$ 50,00' },
  ];
}
