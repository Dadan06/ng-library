import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserLoggedIn } from 'src/app/authentication/store/selectors/authentication.selectors';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(private store: Store<AuthenticationState>) {}
    canActivate() {
        return this.store.pipe(select(getUserLoggedIn));
    }
}
