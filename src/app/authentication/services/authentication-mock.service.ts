import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { USERS_MOCK } from 'src/app/user/models/users.mock';
import { AuthenticationResponse } from '../types/authentication-response.interface';
import { Credentials } from '../types/credentials.interface';
import { AuthenticationServiceInterface } from './authentication-service.interface';

@Injectable()
export class AuthenticationMockService implements AuthenticationServiceInterface {
    logIn(credentials: Credentials): Observable<AuthenticationResponse> {
        const user = USERS_MOCK.find(u => u.login === credentials.login);
        return user
            ? of({
                  user,
                  token:
                      // tslint:disable-next-line:max-line-length
                      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE1NDcwMTc5MjAsImV4cCI6MTU3ODU1MzkyMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ejADqvRbxrU7ymTf31_aez_ErWexF6h0kZvkKbNuoyY'
              }).pipe(delay(1500))
            : throwError(new Error('Identifiant ou mot de passe erroné'));
    }
}
