import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, flatMap, map, switchMap } from 'rxjs/operators';
import { RouterStateUrl } from 'src/app/shared/types/router-state-url.interface';
import { ROLE_ROUTE } from '../../constants/role.constant';
import { RoleService } from '../../services/role.service';
import { Role } from '../../types/role.interface';
import { LoadPrivileges, LoadRole, LoadRoles, LoadRoleSuccess } from '../actions/role.actions';
import { RoleState } from '../reducers/role.reducer';
import { getRoleCriteria } from '../selectors/role.selectors';

@Injectable()
export class RoleRouterEffects {
    constructor(
        private action$: Actions,
        private roleStore: Store<RoleState>,
        private roleService: RoleService
    ) {}

    private mapToRouterStateUrl = (action): RouterStateUrl => action.payload.routerState;

    @Effect()
    loadRoles$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${ROLE_ROUTE}`)),
        flatMap(() => this.roleStore.pipe(select(getRoleCriteria))),
        map(criteria => new LoadRoles(criteria))
    );

    @Effect()
    loadRole$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${ROLE_ROUTE}/edit`) ||
                state.url.includes(`${ROLE_ROUTE}/detail`)
        ),
        map((routerState: RouterStateUrl) => new LoadRole(routerState.params.roleId))
    );

    @Effect()
    newRole$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${ROLE_ROUTE}/new`)),
        switchMap(() =>
            this.roleService
                .roleFactory()
                .pipe(map((response: Role) => new LoadRoleSuccess(response)))
        )
    );

    @Effect()
    loadPrivileges$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${ROLE_ROUTE}/edit`) ||
                state.url.includes(`${ROLE_ROUTE}/detail`) ||
                state.url.includes(`${ROLE_ROUTE}/new`)
        ),
        map(() => new LoadPrivileges())
    );
}
