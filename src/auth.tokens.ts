import { InjectionToken } from '@angular/core';
import { AuthService } from './auth.service';

import { AuthOptions, User } from './models';
import { IAuthTokenServiceInterface } from './auth-token-service.interface';

export const AUTH_OPTIONS: InjectionToken<AuthOptions<User>> = new InjectionToken<AuthOptions<User>>('AUTH_OPTIONS');
export const AUTH_SERVICE: InjectionToken<AuthService<User>> = new InjectionToken<AuthService<User>>('AUTH_SERVICE');
export const AUTH_TOKEN_SERVICE: InjectionToken<AuthService<User>> = new InjectionToken<IAuthTokenServiceInterface>('AUTH_TOKEN_SERVICE');
