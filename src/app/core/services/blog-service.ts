import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Blog, CreateBlogPayload, UpdateBlogPayload, BlogResponse } from '../models/blog.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private httpClient: HttpClient = inject(HttpClient);
  private apiUrl = `${environment.baseUrl}/api/Blog`;

  /**
   * Get all blogs with optional pagination and filtering
   */
  getBlogs(page: number = 1, pageSize: number = 10, category?: string) {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (category) {
      params = params.set('category', category);
    }

    return this.httpClient.get<BlogResponse>(`${this.apiUrl}/GetAllBlogs`, { params });
  }

  /**
   * Get a single blog by ID
   */
  getBlogById(id: string) {
    return this.httpClient.get<Blog>(`${this.apiUrl}/GetBlogById?id=${id}`);
  }

  /**
   * Create a new blog post
   */
  createBlog(payload: CreateBlogPayload) {
    return this.httpClient.post<Blog>(`${this.apiUrl}/CreateBlog`, payload);
  }

  /**
   * Update an existing blog post
   */
  updateBlog(id: string, payload: Partial<CreateBlogPayload>) {
    return this.httpClient.put<Blog>(`${this.apiUrl}/UpdateBlog?id=${id}`, payload);
  }

  /**
   * Delete a blog post
   */
  deleteBlog(id: string) {
    let params = new HttpParams()
      .set('id', id);
    return this.httpClient.delete<void>(`${this.apiUrl}/DeleteBlog`, { params });
  }

  /**
   * Publish a blog post
   */
  publishBlog(id: string) {
    return this.httpClient.patch<Blog>(`${this.apiUrl}/${id}/publish`, {});
  }

  /**
   * Unpublish a blog post
   */
  unpublishBlog(id: string) {
    return this.httpClient.patch<Blog>(`${this.apiUrl}/${id}/unpublish`, {});
  }

  /**
   * Search blogs by keyword
   */
  searchBlogs(keyword: string) {
    const params = new HttpParams().set('search', keyword);
    return this.httpClient.get<BlogResponse>(`${this.apiUrl}/search`, { params });
  }
}
