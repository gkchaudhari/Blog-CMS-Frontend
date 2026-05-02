import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse, LoginPayload, SignupPayload } from '../models/auth.model';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  constructor(private http: HttpClient) { }

  login(payload: LoginPayload) {
    return this.http.post<AuthResponse>(`${environment.baseUrl}`, payload);
  }

  signup(payload: SignupPayload) {
    return this.http.post<AuthResponse>(`${environment.baseUrl}`, payload);
  }
}
