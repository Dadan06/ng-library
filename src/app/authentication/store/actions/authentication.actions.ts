import { Action } from '@ngrx/store';
import { AuthenticationResponse } from '../../types/authentication-response.interface';
import { Credentials } from '../../types/credentials.interface';

export const enum AuthenticationActionTypes {
    LOG_IN = '[Authentication] Log In',
    LOG_IN_FAIL = '[Authentication] Log In Fail',
    LOG_IN_SUCCESS = '[Authentication] Log In Success',
    LOG_OUT = '[Authentification] Log Out'
}

export class LogIn implements Action {
    readonly type = AuthenticationActionTypes.LOG_IN;
    constructor(public payload: Credentials) {}
}

export class LogInFail implements Action {
    readonly type = AuthenticationActionTypes.LOG_IN_FAIL;
    constructor(public payload: Error) {}
}

export class LogInSuccess implements Action {
    readonly type = AuthenticationActionTypes.LOG_IN_SUCCESS;
    constructor(public payload: AuthenticationResponse) {}
}

export class LogOut implements Action {
    readonly type = AuthenticationActionTypes.LOG_OUT;
}

export type AuthenticationAction = LogIn | LogInFail | LogInSuccess | LogOut;
