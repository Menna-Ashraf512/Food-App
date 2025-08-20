import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/app/core/environment/baseUrlImage';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  baseUrl = environment.baseUrl;

  constructor(private httpClient: HttpClient) {}
  addRecipe(data: any): Observable<any> {
    return this.httpClient.post(`Recipe`, data);
  }

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

  deleteRecipe(id: number): Observable<any> {
    return this.httpClient.delete(`Recipe/${id}`);
  }

  updateRecipe(data: any, id: number): Observable<any> {
    return this.httpClient.put(`Recipe/${id}`, data);
  }

  urlToFile(url: string, filename: string): Observable<File> {
    return this.httpClient
      .get(this.baseUrl + url, { responseType: 'blob' })
      .pipe(map((blob) => new File([blob], filename, { type: blob.type })));
  }
}
