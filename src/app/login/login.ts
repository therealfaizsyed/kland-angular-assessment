import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  email: string = 'eddy@yopmail.com';
  password: string = '123123';
  showPassword = false;
  isLoading = false;
  errorMessage: string | null = null;

  constructor(private router: Router, private http: HttpClient) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  login(form: NgForm) {
    this.errorMessage = null;

    if (form.invalid) {
      this.errorMessage = 'Please enter valid email and password';
      return;
    }

    this.isLoading = true;

    const loginData = {
      email: this.email,
      phone: "",
      phoneCode: "965",
      password: this.password,
      deviceToken: "",
      deviceType: "",
      deviceModel: "",
      appVersion: "",
      osVersion: ""
    };

    const headers = {
      'Content-Type': 'application/json',
      'Auth': 'dAwMpo/TAWLhFrwwr3Wzcmc8XTdmAgp6zmGLsFmJ9HAnEbTQAg937i/hqKFjtFVQ4TnQ2y6xlVSeTKy3VWcxvalwvmPq6qF7+UcLd3wBXYoVQ2Puj49mTweKh/v2Rvj9zyVjfbexFkjMNZ5XyGucmdOI6XMmI98Zvu38Jh1fOo8157YxlgCozKkonixczjGIn3RKLuv7v3gXDRl4irzRcS6lYKGJB8vfA847GUppsVjdZV9bAjADfqUP2Iyl6Nz8MOWrSHNy8tWqhM6mI165rCwH3xMv7HEexmsMO7Mi36c=s'
    };

    this.http.post<any>(
      'https://dev-api.wanasti.com/api/v1/user/login?lang=en&currencyCode=KW',
      loginData,
      { headers }
    ).subscribe({
      next: (response) => {
        if (response.status === 1) {
          localStorage.setItem('auth_token', response.data.sessionToken);
          localStorage.setItem('userData', JSON.stringify(response.data));
          this.router.navigate(['/account']);
        } else {
          this.errorMessage = response.message || 'Login failed';
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Login error:', error);
        this.errorMessage = this.getErrorMessage(error);
        this.isLoading = false;
      }
    });
  }

  private getErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    }
    return 'An error occurred during login. Please try again.';
  }
}