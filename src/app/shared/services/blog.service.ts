import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Blog } from '../models/blog';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private baseUrl = environment.apiUrl;
  

  constructor(private http: HttpClient) {}

  getAllBlogs(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.baseUrl + 'api/blog/blogs');
  }

  getBlogById(id: string): Observable<Blog> {
    return this.http.get<Blog>(this.baseUrl+'api/blog/blog/' + id);
  }

  createBlog(blog: Blog): Observable<Blog> {
    return this.http.post<Blog>(this.baseUrl +'api/blog/blog', blog);
  }

  updateBlog(id: string, blog: Blog): Observable<Blog> {
    return this.http.put<Blog>(`${this.baseUrl}api/blog/blog/${id}`, blog);
  }

  deleteById(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}api/blog/blog/${id}`);
  }
}
