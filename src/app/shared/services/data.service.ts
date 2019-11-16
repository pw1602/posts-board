import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@core/interfaces/user';
import { Post } from '@/core/interfaces/post';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private url = 'https://gorest.co.in/public-api';

  constructor(private http: HttpClient) { }

  getAllUsers(page?: number): Observable<any> {
    return this.http.get(`${this.url}/users?_format=json&page=${page || 1}`);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/users/${id}?_format=json`);
  }

  getUserByName(firstName: string, lastName: string): Observable<User> {
    return this.http.get<User>(`${this.url}/users?_format=json&first_name=${firstName}&last_name=${lastName}`);
  }

  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(`${this.url}/users/${id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/users/${id}`);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.url}/users`, user);
  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get(`${this.url}/posts?user_id=${id}`).pipe(
      map((value: any) => value.result)
    );
  }

  createPost(post: Post): Observable<any> {
    return this.http.post(`${this.url}/posts`, post);
  }

  getPostComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.url}/comments?post_id=${id}`);
  }

  createComment(comment: Comment): Observable<any> {
    return this.http.post(`${this.url}/comments`, comment);
  }
}
