import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private httpClient: HttpClient) {}
  getAllRecipes(): Observable<any> {
    return this.httpClient.get(`Recipe`);
  }
}
