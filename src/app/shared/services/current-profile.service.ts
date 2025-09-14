import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../core/environment/baseUrlImage';

@Injectable({
  providedIn: 'root',
})
export class CurrentProfileService {
  constructor(private httpClient: HttpClient) {}
  getCurrentUser(): Observable<any> {
    return this.httpClient.get(`Users/currentUser`);
  }
  editCurrentUser(data: any): Observable<any> {
    return this.httpClient.put(`Users`, data);
  }
}
