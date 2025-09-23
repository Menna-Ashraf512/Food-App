import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  email: string = '';
  Img: any;

  constructor(private httpClient: HttpClient) {
    if (localStorage.getItem('useToken') !== null) {
      this.getProfile();
    }
  }

  login(data: any): Observable<any> {
    return this.httpClient.post(`Users/Login`, data);
  }

  getProfile() {
    let encode: any = localStorage.getItem('userToken');
    let decoded: any = jwtDecode(encode);
    localStorage.setItem('role', decoded.userGroup);
  }
  getProfileData(): Observable<any> {
    return this.httpClient.get(`Users/currentUser`);
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

  changePass(data: any): Observable<any> {
    const token = localStorage.getItem('userToken');

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    return this.httpClient.put(`Users/ChangePassword`, data, { headers });
  }
}
