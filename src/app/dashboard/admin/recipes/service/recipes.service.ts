import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private httpClient: HttpClient) {}
  addRecipe(data: any): Observable<any> {
    return this.httpClient.post(`Recipe`, data);
  }
  getAllRecipes(
    pageSize: number,
    pageNumber: number,
    name: string
  ): Observable<any> {
    return this.httpClient.get(`Recipe`, {
      params: {
        pageSize,
        pageNumber,
        name,
      },
    });
  }
  getRecipeById(id: number): Observable<any> {
    return this.httpClient.get(`Recipe/${id}`);
  }
  getAllTag(): Observable<any> {
    return this.httpClient.get(`tag`);
  }
  deleteRecipe(id: number): Observable<any> {
    return this.httpClient.delete(`Recipe/${id}`);
  }
  updateRecipe(data: any, id: number): Observable<any> {
    return this.httpClient.put(`Recipe/${id}`, data);
  }
}
