import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { Paginated } from '../../../shared/types/paginated.interface';
import { ROLE_BASE_ROUTE } from '../../constants/role.constant';
import { RoleService } from '../../services/role.service';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';
import {
    AddRole,
    DeleteRole,
    DeleteRoleSuccess,
    EditRole,
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
    SaveRoleSuccess,
    SelectRole
} from '../actions/role.actions';
import { RoleState } from '../reducers/role.reducer';
import { getRoleCriteria } from '../selectors/role.selectors';

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
                map((response: Role) => new SaveRoleSuccess(response)),
                catchError(error => of(new SaveRoleFail(error)))
            )
        )
    );

    @Effect()
    saveRoleSuccess$ = this.action$.pipe(
        ofType(RoleActionTypes.SAVE_ROLE_SUCCESS),
        map((action: SaveRoleSuccess) => action.payload),
        withLatestFrom(this.store.pipe(select(getRoleCriteria))),
        mergeMap(([role, criteria]) => [
            new LoadRoles(criteria),
            new Go({ path: [`${ROLE_BASE_ROUTE}/detail/${role._id}`] })
        ])
    );

    @Effect()
    selectRole$ = this.action$.pipe(
        ofType(RoleActionTypes.SELECT_ROLE),
        map((action: SelectRole) => action.payload),
        map((role: Role) => new Go({ path: [`${ROLE_BASE_ROUTE}/detail`, role._id] }))
    );

    @Effect()
    editRole$ = this.action$.pipe(
        ofType(RoleActionTypes.EDIT_ROLE),
        map((action: EditRole) => action.payload),
        map((role: Role) => new Go({ path: [`${ROLE_BASE_ROUTE}/edit`, role._id] }))
    );

    @Effect()
    addRole$ = this.action$.pipe(
        ofType(RoleActionTypes.ADD_ROLE),
        mergeMap((action: AddRole): Observable<Role> => this.roleService.roleFactory()),
        map((response: Role) => new EditRole(response))
    );

    @Effect()
    deleteRole$ = this.action$.pipe(
        ofType(RoleActionTypes.DELETE_ROLE),
        mergeMap(
            (action: DeleteRole): Observable<boolean> => this.roleService.deleteRole(action.payload)
        ),
        map(() => new DeleteRoleSuccess())
    );

    @Effect()
    deleteRoleSuccess$ = this.action$.pipe(
        ofType(RoleActionTypes.DELETE_ROLE_SUCCESS),
        withLatestFrom(this.store.pipe(select(getRoleCriteria))),
        mergeMap(([action, criteria]) => [
            new LoadRoles(criteria),
            new Go({ path: [`${ROLE_BASE_ROUTE}`] })
        ])
    );

    @Effect()
    removeEditedRole = this.action$.pipe(
        ofType(RoleActionTypes.REMOVE_EDITED_ROLE),
        map(() => new Go({ path: [`${ROLE_BASE_ROUTE}`] }))
    );
}
