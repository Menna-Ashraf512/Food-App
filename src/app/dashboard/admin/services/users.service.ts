import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  getAllUsers(paramData: any): Observable<any> {
    return this.httpClient.get(`Users`, { params: paramData });
  }
  deleteUsers(id: number): Observable<any> {
    return this.httpClient.delete(`Users/${id}`);
  }
  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`Users/${id}`);
  }
}
