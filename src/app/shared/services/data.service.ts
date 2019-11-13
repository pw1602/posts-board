import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '@core/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://gorest.co.in/public-api';

  constructor(private http: HttpClient) { }

  getAllUsers(page?: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.url}/users?_format=json&page=${page || 1}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}?_format=json`);
  }

  getUserByName(name: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users?name=${name}&_format=json`);
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.http}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.http}/users/${id}`);
  }
}
