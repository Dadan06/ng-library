import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { ACCESS_MANAGEMENT_MENU } from 'src/app/root/constants/access-management.constant';
import { HOME_MENU } from 'src/app/root/constants/home.constant';
import { Menu } from 'src/app/root/types/menu.interface';
import { getFirstAvailableMenu } from 'src/app/shared/utils/get-first-avalaible-menu.utils';
import { User } from 'src/app/user/types/user.interface';
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
                catchError(loginError => of(new LogInFail(loginError && loginError.error)))
            )
        )
    );

    @Effect()
    logInSuccess$ = this.action$.pipe(
        ofType(AuthenticationActionTypes.LOG_IN_SUCCESS),
        map((action: LogInSuccess) => action.payload.user),
        map((user: User) =>
            getFirstAvailableMenu(user.role.privileges.map(p => p.name), [
                ...HOME_MENU,
                ...ACCESS_MANAGEMENT_MENU
            ])
        ),
        map((menu: Menu) => new Go({ path: menu ? [menu.routerLink] : ['/authentication'] }))
    );

    @Effect()
    logOut$ = this.action$.pipe(
        ofType(AuthenticationActionTypes.LOG_OUT),
        map(() => new Go({ path: ['/authentication'] }))
    );
}
