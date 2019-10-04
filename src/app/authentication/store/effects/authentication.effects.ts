import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { AuthenticationService } from '../../services/authentication.service';
import { AuthenticationResponse } from '../../types/authentication-response.interface';
import {
    AuthenticationActionTypes,
    LogIn,
    LogInFail,
    LogInSuccess
} from '../actions/authentication.actions';

@Injectable()
export class AuthenticationEffects {
    constructor(private action$: Actions, private authenticationService: AuthenticationService) {}
    @Effect()
    logIn$ = this.action$.pipe(
        ofType(AuthenticationActionTypes.LOG_IN),
        switchMap((action: LogIn) =>
            this.authenticationService.logIn(action.payload).pipe(
                map((response: AuthenticationResponse) => new LogInSuccess(response)),
                catchError(error => of(new LogInFail(error)))
            )
        )
    );

    @Effect()
    logInSuccess$ = this.action$.pipe(
        ofType(AuthenticationActionTypes.LOG_IN_SUCCESS),
        map(() => new Go({ path: ['/root'] }))
    );

    @Effect()
    logOut$ = this.action$.pipe(
        ofType(AuthenticationActionTypes.LOG_OUT),
        map(() => new Go({ path: ['/authentication'] }))
    );
}
