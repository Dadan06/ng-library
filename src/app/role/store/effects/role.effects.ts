import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { Paginated } from '../../../shared/types/paginated.interface';
import { ROLE_BASE_ROUTE } from '../../constants/role.constant';
import { RoleService } from '../../services/role.service';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';
import {
    DeleteRole,
    DeleteRoleFail,
    LoadPrivileges,
    LoadPrivilegesFail,
    LoadPrivilegesSuccess,
    LoadRole,
    LoadRoleFail,
    LoadRoles,
    LoadRolesFail,
    LoadRolesSuccess,
    LoadRoleSuccess,
    RoleActionTypes,
    SaveRole,
    SaveRoleFail,
    SaveRoleSuccess
} from '../actions/role.actions';
import { RoleState } from '../reducers/role.reducer';

@Injectable()
export class RoleEffects {
    constructor(
        private action$: Actions,
        private roleService: RoleService,
        private store: Store<RoleState>
    ) {}

    @Effect()
    loadRoles$ = this.action$.pipe(
        ofType(RoleActionTypes.LOAD_ROLES),
        mergeMap((action: LoadRoles) =>
            this.roleService.loadRoles(action.payload).pipe(
                map((response: Paginated<Role>) => new LoadRolesSuccess(response)),
                catchError(error => of(new LoadRolesFail(error)))
            )
        )
    );

    @Effect()
    loadRole$ = this.action$.pipe(
        ofType(RoleActionTypes.LOAD_ROLE),
        mergeMap((action: LoadRole) =>
            this.roleService.loadRole(action.payload).pipe(
                map((response: Role) => new LoadRoleSuccess(response)),
                catchError(error => of(new LoadRoleFail(error)))
            )
        )
    );

    @Effect()
    loadPrivileges$ = this.action$.pipe(
        ofType(RoleActionTypes.LOAD_PRIVILEGES),
        mergeMap((action: LoadPrivileges) =>
            this.roleService.loadPrivileges().pipe(
                map((response: Privilege[]) => new LoadPrivilegesSuccess(response)),
                catchError(error => of(new LoadPrivilegesFail(error)))
            )
        )
    );

    @Effect()
    saveRole$ = this.action$.pipe(
        ofType(RoleActionTypes.SAVE_ROLE),
        mergeMap((action: SaveRole) =>
            this.roleService.saveRole(action.payload).pipe(
                mergeMap((response: Role) => [
                    new SaveRoleSuccess(response),
                    new Go({ path: [`${ROLE_BASE_ROUTE}/detail/${response._id}`] })
                ]),
                catchError(error => of(new SaveRoleFail(error)))
            )
        )
    );

    @Effect()
    deleteRole$ = this.action$.pipe(
        ofType(RoleActionTypes.DELETE_ROLE),
        mergeMap((action: DeleteRole) =>
            this.roleService.deleteRole(action.payload).pipe(
                map(() => new Go({ path: [`${ROLE_BASE_ROUTE}`] })),
                catchError(error => of(new DeleteRoleFail(error)))
            )
        )
    );
}
