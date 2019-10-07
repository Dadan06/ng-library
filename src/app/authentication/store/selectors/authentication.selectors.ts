import { HttpErrorResponse } from '@angular/common/http';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { Role } from 'src/app/role/types/role.interface';
import { User } from 'src/app/user/types/user.interface';
import { AuthenticationState } from '../reducers/authentication.reducers';

export const getAuthenticationState = createFeatureSelector<AuthenticationState>('authentication');

export const getLoggedUser = createSelector<AuthenticationState, AuthenticationState, User>(
    getAuthenticationState,
    (state: AuthenticationState) => state && state.user
);

export const getUserLoggedIn = createSelector<AuthenticationState, AuthenticationState, boolean>(
    getAuthenticationState,
    (state: AuthenticationState) => state && state.userLoggedIn
);

export const getUserLoggingIn = createSelector<AuthenticationState, AuthenticationState, boolean>(
    getAuthenticationState,
    (state: AuthenticationState) => state.userLoggingIn
);

export const getLoginError = createSelector<
    AuthenticationState,
    AuthenticationState,
    HttpErrorResponse
>(
    getAuthenticationState,
    (state: AuthenticationState) => state.loginError
);

export const getLoginErrorMessage = createSelector<AuthenticationState, HttpErrorResponse, string>(
    getLoginError,
    (loginError: Error) => loginError && loginError.message
);

export const getUserRole = createSelector<AuthenticationState, User, Role>(
    getLoggedUser,
    (user: User) => user && user.role
);

export const getUserPrivileges = createSelector<AuthenticationState, Role, Privilege[]>(
    getUserRole,
    (role: Role) => role && role.privileges
);
