import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}
  getAllUsers(
    pageSize: number,
    pageNumber: number,
    userName: string
  ): Observable<any> {
    return this.httpClient.get(`Users`, {
      params: {
        pageSize,
        pageNumber,
        userName,
      },
    });
  }
  deleteUsers(id: number): Observable<any> {
    return this.httpClient.delete(`Users/${id}`);
  }
  getUserById(id: number): Observable<any> {
    return this.httpClient.get(`Users/${id}`);
  }
}
