import { AuthenticationState } from '../store/reducers/authentication.reducers';

export function tokenGetter(): string {
    const authenticationStateStr = localStorage.getItem('authentication');
    const authenticationState: AuthenticationState =
        authenticationStateStr && JSON.parse(authenticationStateStr);
    return authenticationState && authenticationState.token;
}
