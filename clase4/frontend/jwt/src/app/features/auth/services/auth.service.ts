import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ProfileResponse } from '../interfaces/profile.interface';
import { LoginResponse } from '../interfaces/login-response.interface';
import { Login } from '../interfaces/login.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http:/localhost:3000';
  private http = inject(HttpClient);

  token = signal<string | null>(null);
  profile = signal <ProfileResponse | null>(null);


  constructor() {
    this.loadToken();
  }

  login(credentials: Login){
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`, credentials
    )
  }

  saveToken(token: string): void{
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  loadToken(): void {
    const token = localStorage.getItem('token');
    this.token.set(token);
  }

  removeToken(): void {
    localStorage.removeItem('token');
    this.token.set(null);
  }

}
