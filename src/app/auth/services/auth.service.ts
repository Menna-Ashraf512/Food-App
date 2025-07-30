import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { login } from '../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(data: any): Observable<any> {
    return this.httpClient.post(`Users/Login`, data);
  }

  register(data: any): Observable<any> {
    return this.httpClient.post(`Users/Register`, data);
  }

  verify(data: any): Observable<any> {
    return this.httpClient.put(`Users/Verify`, data);
  }

  forgetPass(data: any): Observable<any> {
    return this.httpClient.post(`Users/Reset/Request`, data);
  }

  resetPass(data: any): Observable<any> {
    return this.httpClient.post(`Users/Reset`, data);
  }
}
