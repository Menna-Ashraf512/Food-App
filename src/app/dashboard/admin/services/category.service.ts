import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAllCategory(data: any): Observable<any> {
    return this.httpClient.get(`Category`, {
      params: data,
    });
  }
  getCategoryById(id: any): Observable<any> {
    return this.httpClient.get(`Category/${id}`);
  }
  AddCategory(data: any): Observable<any> {
    return this.httpClient.post(`Category`, data);
  }
  UpdateCategory(id: any, data: any): Observable<any> {
    return this.httpClient.put(`Category/${id}`, data);
  }
  DeleteCategory(id: any): Observable<any> {
    return this.httpClient.delete(`Category/${id}`);
  }
}
