import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../app.types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
