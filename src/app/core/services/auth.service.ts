import { Injectable, signal, computed, inject } from '@angular/core';
import { AuthApiService } from './auth-api-service';
import { LoginPayload, SignupPayload } from '../models/auth.model';
import { catchError, EMPTY, firstValueFrom, tap } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private tokenKey = 'auth_token';

    private _isLoggedIn = signal<boolean>(this.hasToken());
    private _currentUser = signal<User | null>(null);

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

    restoreSession() {
        const token = this.getToken();

        if (!token) {
            return Promise.resolve();
        }

        return this.authAPIService.getCurrentUser().pipe(
            tap(user => {
                this.setCurrentUser(user);
            }),
            catchError(() => {
                this.logout();
                return EMPTY;
            })
        );


    }
    setCurrentUser(user: any) {
        this._currentUser.set(user);
        this._isLoggedIn.set(true);
    }

    getCurrentUser() {
        return this._currentUser();
    }
}