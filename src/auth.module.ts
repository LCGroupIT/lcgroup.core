import { HttpClientModule } from '@angular/common/http';
import { ClassProvider, FactoryProvider, ModuleWithProviders, NgModule, Optional, Type } from '@angular/core';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthApiService } from './auth-api.service';
import { AuthTokenService } from './auth-token.service';
import { defaults } from './auth.constants';
import { AuthService } from './auth.service';
import * as AuthTokens from './auth.tokens';
import { AuthorizeDirective } from './directives/authorize.directive';
import { AuthorizeControlDirective } from './directives/authorize-control.directive';
import { AuthOptions, User } from './models';
import { CookieAuthTokenService } from './cookie-auth-token.service';
import { AUTH_TOKEN_SERVICE } from './auth.tokens';
import { IAuthTokenServiceInterface } from './auth-token-service.interface';

export interface AuthTokenServiceClassProvider extends ClassProvider {
    useClass: Type<IAuthTokenServiceInterface>;
}

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [AuthorizeDirective, AuthorizeControlDirective],
    exports: [AuthorizeDirective, AuthorizeControlDirective]
})
export class AuthModule {
    static forRoot<T extends User>(options: AuthOptions<T>, service?: typeof AuthService, authTokenServiceProcvider?: AuthTokenServiceClassProvider): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
                AuthTokenService,
                AuthApiService,
                CookieAuthTokenService,
                {
                    provide: AuthTokens.AUTH_SERVICE,
                    useClass: service || AuthService
                },
                {
                    provide: AuthTokens.AUTH_OPTIONS,
                    useValue: options || defaults
                },
                authTokenServiceProcvider || {
                    provide: AUTH_TOKEN_SERVICE,
                    useClass: AuthTokenService
                }
            ]
        };
    }

    constructor(@Optional() jwtModule: JwtModule) {
        if (!jwtModule) {
            throw new Error('JwtModule required to be loaded.');
        }
    }
}
