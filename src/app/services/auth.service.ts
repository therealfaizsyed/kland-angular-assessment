// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://dev-api.wanasti.com/api/v1/user/login';
  private authToken = 'dAwMpo/TAWLhFrwwr3Wzcmc8XTdmAgp6zmGLsFmJ9HAnEbTQAg937i/hqKFjtFVQ4TnQ2y6xlVSeTKy3VWcxvalwvmPq6qF7+UcLd3wBXYoVQ2Puj49mTweKh/v2Rvj9zyVjfbexFkjMNZ5XyGucmdOI6XMmI98Zvu38Jh1fOo8157YxlgCozKkonixczjGIn3RKLuv7v3gXDRl4irzRcS6lYKGJB8vfA847GUppsVjdZV9bAjADfqUP2Iyl6Nz8MOWrSHNy8tWqhM6mI165rCwH3xMv7HEexmsMO7Mi36c=s';

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const loginData = {
      email: email,
      phone: "",
      phoneCode: "965",
      password: password,
      deviceToken: "",
      deviceType: "",
      deviceModel: "",
      appVersion: "",
      osVersion: ""
    };

    const headers = {
      'Content-Type': 'application/json',
      'Auth': this.authToken
    };

    return this.http.post<any>(
      `${this.apiUrl}?lang=en&currencyCode=KW`,
      loginData,
      { headers }
    ).pipe(
      tap(response => {
        if (response.status === 1) {
          localStorage.setItem('auth_token', response.data.sessionToken);
          localStorage.setItem('userData', JSON.stringify(response.data));
        }
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('userData');
  }

  getUserData() {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }
}