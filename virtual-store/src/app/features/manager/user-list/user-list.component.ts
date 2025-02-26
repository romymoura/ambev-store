import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  columns = ['Id', 'Username', 'E-mail', 'Phone', 'Role'];
  userList = [
    { id: 1, username: 'Produto A', email: 'teste@teste.com', phone: '11 12345-6789', role: 'Customer' },
    { id: 2, username: 'Produto A', email: 'teste@teste.com', phone: '11 12345-6789', role: 'Customer' },
    { id: 3, username: 'Produto A', email: 'teste@teste.com', phone: '11 12345-6789', role: 'Customer' },
    { id: 4, username: 'Produto A', email: 'teste@teste.com', phone: '11 12345-6789', role: 'Customer' },
    { id: 5, username: 'Produto A', email: 'teste@teste.com', phone: '11 12345-6789', role: 'Customer' },
  ];
}
