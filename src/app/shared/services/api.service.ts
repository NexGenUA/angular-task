import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

import { environment } from '../../../environments/environment';
import { Post } from '../models/post.model';
import { Comments } from '../models/comments.model';
import { UserDto } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLimitPosts(start: number = 0, limit: number = 10): Observable<Post[]> {
    const url = new URL(this.apiUrl);
    url.pathname = 'posts';
    const params: Params = new HttpParams()
      .set('_start', start.toString())
      .set('_limit', limit.toString());

    return this.http.get<Post[]>(url.href, { params });
  }

  getPostById(postId: string): Observable<Post> {
    const url = new URL(this.apiUrl);
    url.pathname = `posts/${postId}`;
    return this.http.get<Post>(url.href);
  }

  getCommentsByPostId(userId: string): Observable<Comments[]> {
    const url = new URL(this.apiUrl);
    url.pathname = `posts/${userId}/comments`;
    return this.http.get<Comments[]>(url.href);
  }

  getUserById(userId: string): Observable<UserDto> {
    const url = new URL(this.apiUrl);
    url.pathname = `users/${userId}`;
    return this.http.get<UserDto>(url.href);
  }
}
