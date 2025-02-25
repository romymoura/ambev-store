import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../../shared/enums/user-role.enum';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const requiredRoles = route.data['roles'] as UserRole[];

    if (this.authService.isLoggedIn() && this.authService.hasRole(requiredRoles)) {
      return true;
    }

    // Redirect based on user's role
    const userRole = this.authService.getCurrentUserRole();
    if (userRole === UserRole.Customer) {
      return this.router.createUrlTree(['/customer/products']);
    } else if (userRole === UserRole.Admin) {
      return this.router.createUrlTree(['/admin/products']);
    } else if (userRole === UserRole.Manager) {
      return this.router.createUrlTree(['/manager/users']);
    }

    return this.router.createUrlTree(['/login']);
  }
}
