
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserRole } from '../enums/user-role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  userRoleEnum = UserRole;
  constructor(public authService: AuthService, public router: Router) { }

  public sigOut(): void {
    if ( this.authService.isLoggedIn() ) {
      this.authService.logout();
    }
  }

  public verifyRole(roleArea: any): boolean {
    let result = ((this.authService.userRole == roleArea) && (this.authService.isLoggedIn()));
    return result;
  }
}
