import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { USER_ROUTE } from '../../constants/user.constant';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.interface';
import { LoadAllRole, LoadUser, LoadUsers, LoadUserSuccess } from '../actions/user.actions';
import { UserState } from '../reducers/user.reducers';
import { getUserCriteria, getUsers } from '../selectors/user.selectors';

@Injectable()
export class UserRouterEffects {
    constructor(
        private action$: Actions,
        private store: Store<UserState>,
        private userService: UserService
    ) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    userRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${USER_ROUTE}`)),
        withLatestFrom(this.store.pipe(select(getUsers)), this.store.pipe(select(getUserCriteria))),
        filter(([routerState, users]) => users.length === 0),
        map(([routerState, users, userCriteria]) => new LoadUsers(userCriteria))
    );

    @Effect()
    userFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${USER_ROUTE}/detail`) ||
                state.url.includes(`${USER_ROUTE}/edit`)
        ),
        map(routerState => new LoadUser(routerState.params.userId))
    );

    @Effect()
    userNewRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${USER_ROUTE}/new`)),
        switchMap(() =>
            this.userService
                .userFactory()
                .pipe(map((response: User) => new LoadUserSuccess(response)))
        )
    );

    @Effect()
    loadRoles$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${USER_ROUTE}/new`) || state.url.includes(`${USER_ROUTE}/edit`)
        ),
        map(() => new LoadAllRole())
    );
}
