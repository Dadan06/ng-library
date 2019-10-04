import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogIn } from '../../store/actions/authentication.actions';
import { AuthenticationState } from '../../store/reducers/authentication.reducers';
import {
    getLoginErrorMessage,
    getUserLoggingIn
} from '../../store/selectors/authentication.selectors';
import { Credentials } from '../../types/credentials.interface';

@Component({
    selector: 'app-authentication-root',
    templateUrl: './authentication-root.component.html',
    styleUrls: ['./authentication-root.component.scss']
})
export class AuthenticationRootComponent implements OnInit {
    loginErrorMessage$: Observable<string>;
    userLoggingIn$: Observable<boolean>;

    constructor(private store: Store<AuthenticationState>) {}

    ngOnInit() {
        this.loginErrorMessage$ = this.store.pipe(select(getLoginErrorMessage));
        this.userLoggingIn$ = this.store.pipe(select(getUserLoggingIn));
    }

    onLogIn(credentials: Credentials) {
        this.store.dispatch(new LogIn(credentials));
    }
}
