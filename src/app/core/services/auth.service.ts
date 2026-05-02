import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthApiService } from './auth-api-service';
import { LoginPayload, SignupPayload } from '../models/auth.model';
import { tap } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth_token';

    private _isLoggedIn = signal<boolean>(this.hasToken());

    private authAPIService = inject(AuthApiService);

    isLoggedIn = computed(() => this._isLoggedIn());

    constructor() { }

    login(loginPayload: LoginPayload) {
        return this.authAPIService.login(loginPayload).pipe(
            tap(x => this.setSession(x.token))
        );
    }

    signup(signUpPaylaod: SignupPayload) {
        return this.authAPIService.signup(signUpPaylaod).pipe(
            tap(x => this.setSession(x.token))
        );
    }

    logout() {
        localStorage.removeItem(this.tokenKey);
        this._isLoggedIn.set(false);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    private hasToken(): boolean {
        return !!localStorage.getItem(this.tokenKey);
    }

    private setSession(token: string) {
        localStorage.setItem(this.tokenKey, token);
        this._isLoggedIn.set(true);
    }
}