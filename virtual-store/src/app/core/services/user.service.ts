import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../../environments/environment';
import { UserListResponse } from '../models/user-list.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/Users`;

  constructor(private http: HttpClient) { }

  register(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }


  getUsers(): Observable<UserListResponse> {
    return this.http.get<UserListResponse>(this.apiUrl);
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  updateUserRole(id: string, role: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/role`, { role });
  }

  updateUserStatus(id: string, status: number): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/status`, { status });
  }
}
