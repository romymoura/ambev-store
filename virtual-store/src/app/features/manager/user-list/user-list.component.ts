import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  columns = ['Id', 'Username', 'E-mail', 'Phone', 'Role'];
  userList:  any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): any {
      this.loading = true;
      this.errorMessage = '';
      this.userService.getUsers().subscribe({
        next: (response) => {
          this.loading = false;
          if (response.success && response.data.success) {
            this.userList = response.data.data;
          } else {
            this.errorMessage = response.data.message || 'Authentication failed';
          }
        },
        error: (error) => {
          this.loading = false;
          this.errorMessage = error.error?.message || 'An error occurred during login';
        }
      });
    }
}
