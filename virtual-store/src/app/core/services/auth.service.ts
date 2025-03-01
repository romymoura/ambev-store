import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { UserRole } from '../../shared/enums/user-role.enum';
import { UserStatus } from '../../shared/enums/user-status.enum';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/Auth`;
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  token: string = '';
  username: string = '';
  userRole: string = '';


  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromLocalStorage();
  }

  public loadUserFromLocalStorage() {
    const userData = localStorage.getItem('currentUser') ?? null;
    if (userData) {
      const data = JSON.parse(userData)
      this.currentUserSubject.next(data);
      this.token = data.token;
      this.username = data.name;
      this.userRole = data.role;
    }
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(this.apiUrl, { email, password }).pipe(
      tap(response => {
        if (response.success && response.data.success) {
            const userData = response.data.data;
            localStorage.setItem('token', userData.token);
            localStorage.setItem('currentUser', JSON.stringify({
            email: userData.email,
            name: userData.name,
            role: userData.role
          }));
          this.currentUserSubject.next({
            email: userData.email,
            name: userData.name,
            role: userData.role
          });
          this.token = userData.token;
          this.username = userData.name;
          this.userRole = userData.role;
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('cart');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.token = '';
    this.username = '';
    this.router.navigate(['/auth/login']);
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/recover-password`, { email });
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { token, newPassword });
  }

  isAuthorized(): boolean {
    let authorized = this.token != null;
    if (!authorized) {
      const token = localStorage.getItem('token');
      if (token != null && token !== '' && token !== undefined) {
        this.token = token;
        authorized = this.token != null;
      }
    }
    return authorized;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserName(): string | null  {
    const user = this.currentUserSubject.value;
    return user ? user.name : null;
  }


  getCurrentUserRole(): UserRole | null {
    const user = this.currentUserSubject.value;
    return user ? user.role : null;
    //return this.userRole as UserRole;
  }

  hasRole(roles: UserRole[]): boolean {
    const userRole = this.getCurrentUserRole();
    return userRole !== null && roles.includes(userRole);
  }

  isActive(): boolean {
    const user = this.currentUserSubject.value;
    return user ? user.status === UserStatus.Active : false;
  }
}
