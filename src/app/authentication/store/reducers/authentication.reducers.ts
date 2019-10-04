import { User } from 'src/app/user/types/user.interface';
import {
    AuthenticationAction,
    AuthenticationActionTypes,
    LogIn,
    LogInFail,
    LogInSuccess,
    LogOut
} from '../actions/authentication.actions';

export interface AuthenticationState {
    user: User;
    userLoggedIn: boolean;
    userLoggingIn: boolean;
    token: string;
    loginError: Error;
}

const initialState: AuthenticationState = {
    user: undefined,
    userLoggedIn: false,
    userLoggingIn: false,
    token: undefined,
    loginError: undefined
};

const logIn = (state: AuthenticationState, action: LogIn): AuthenticationState => ({
    ...state,
    userLoggedIn: false,
    userLoggingIn: true
});

const logInFail = (state: AuthenticationState, action: LogInFail): AuthenticationState => ({
    ...state,
    userLoggedIn: false,
    userLoggingIn: false,
    loginError: action.payload
});

const logInSuccess = (state: AuthenticationState, action: LogInSuccess): AuthenticationState => ({
    ...state,
    userLoggedIn: true,
    userLoggingIn: false,
    user: action.payload.user,
    token: action.payload.token
});

const logOut = (state: AuthenticationState, action: LogOut): AuthenticationState => ({
    ...state,
    user: undefined,
    userLoggedIn: false,
    token: undefined
});

export function authenticationReducer(
    state: AuthenticationState = initialState,
    action: AuthenticationAction
): AuthenticationState {
    switch (action.type) {
        case AuthenticationActionTypes.LOG_IN:
            return logIn(state, action);
        case AuthenticationActionTypes.LOG_IN_FAIL:
            return logInFail(state, action);
        case AuthenticationActionTypes.LOG_IN_SUCCESS:
            return logInSuccess(state, action);
        case AuthenticationActionTypes.LOG_OUT:
            return logOut(state, action);
        default:
            return state;
    }
}
