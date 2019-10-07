import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse } from '../types/authentication-response.interface';
import { Credentials } from '../types/credentials.interface';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) {}

    logIn(credentials: Credentials): Observable<AuthenticationResponse> {
        return this.http
            .post(`${environment.apiBaseUrl}/authentication/login`, credentials)
            .pipe(map((response: ApiResponse) => response.data as AuthenticationResponse));
    }
}
