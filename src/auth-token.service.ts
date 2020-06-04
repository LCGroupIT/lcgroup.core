import { Inject, Injectable } from '@angular/core';

import { defaults } from './auth.constants';
import * as AuthTokens from './auth.tokens';
import { AuthOptions, User } from './models';
import { IAuthTokenServiceInterface } from './auth-token-service.interface';

@Injectable()
export class AuthTokenService implements IAuthTokenServiceInterface {
    private readonly storageTokenName: string;

    constructor(@Inject(AuthTokens.AUTH_OPTIONS) options: AuthOptions<User>) {
        const opts = options || {userType: User};
        this.storageTokenName = opts.storageTokenName || defaults.storageTokenName;
    }

    saveToken(token: string): void {
        return localStorage.setItem(this.storageTokenName, token);
    }

    getToken(): string {
        return localStorage.getItem(this.storageTokenName);
    }

    remove(): void {
        localStorage.removeItem(this.storageTokenName);
    }
}
