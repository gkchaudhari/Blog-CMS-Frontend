import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginPayload, SignupPayload } from '../models/auth.model';
import { environment } from '../../../environments/environment.development';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) { }

  login(payload: LoginPayload) {
    return this.http.post<AuthResponse>(`${environment.baseUrl}/api/auth/login`, payload);
  }

  signup(payload: SignupPayload) {
    return this.http.post<AuthResponse>(`${environment.baseUrl}/api/auth/register`, payload);
  }

  getCurrentUser() {
    return this.http.get<User>(`${environment.baseUrl}/api/Users/getCurrentUser`);
  }
}
