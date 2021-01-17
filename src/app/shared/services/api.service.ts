import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Params } from '@angular/router';

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
}
