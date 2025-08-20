import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeUserService {
  constructor(private httpClient: HttpClient) {}
  getAllRecipes(data: any): Observable<any> {
    return this.httpClient.get(`Recipe`, {
      params: data,
    });
  }

  getRecipeById(id: number): Observable<any> {
    return this.httpClient.get(`Recipe/${id}`);
  }

  getAllTag(): Observable<any> {
    return this.httpClient.get(`tag`);
  }
  getAllCategory(data: any): Observable<any> {
    return this.httpClient.get(`Category`, {
      params: data,
    });
  }
  addFavorite(id: number): Observable<any> {
    const body = {
      recipeId: id,
    };
    return this.httpClient.post(`userRecipe`, body);
  }
  getAllFavorite(): Observable<any> {
    return this.httpClient.get(`userRecipe`);
  }
  deleteFavorite(id: number): Observable<any> {
    return this.httpClient.delete(`userRecipe/${id}`);
  }
}
