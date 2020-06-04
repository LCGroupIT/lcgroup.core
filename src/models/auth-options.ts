import { OAuthParams } from './oauth-params';
import { AuthService } from '../auth.service';
import { User } from './user';

export interface AuthOptions<T> {
    userType?: new() => T;
    tokenName?: string;
    tokenEndpoint?: string;
    stsParams?: OAuthParams;
    storageTokenName?: string;
}
