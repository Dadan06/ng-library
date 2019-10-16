/* tslint:disable:max-line-length */
import { HttpErrorResponse } from '@angular/common/http';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { getRouterState } from 'src/app/core/store/selectors/router.selectors';
import { Paginated } from '../../../shared/types/paginated.interface';
import { UserPrivileges } from '../../constants/privilege.constants';
import { ROLE_ROUTE } from '../../constants/role.constant';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';
import { RoleState } from '../reducers/role.reducer';

export const getRoleState = createFeatureSelector<RoleState>('role');

export const getPaginatedRoles = createSelector(
    getRoleState,
    (state: RoleState) => state.roles
);

export const getRoles = createSelector(
    getPaginatedRoles,
    (paginatedRoles: Paginated<Role>) => paginatedRoles.items
);

export const getRolesTotalItems = createSelector(
    getPaginatedRoles,
    (paginatedRoles: Paginated<Role>) => paginatedRoles.totalItems
);

export const getPrivileges = createSelector<RoleState, RoleState, Privilege[]>(
    getRoleState,
    (state: RoleState) => state.privileges
);

export const getPrivilegesLoading = createSelector<RoleState, RoleState, boolean>(
    getRoleState,
    (state: RoleState) => state.privilegesLoading
);

export const getPrivilegesLoaded = createSelector<RoleState, RoleState, boolean>(
    getRoleState,
    (state: RoleState) => state.privilegesLoaded
);

export const getRoleCriteria = createSelector(
    getRoleState,
    (state: RoleState) => state.roleCriteria
);

export const getSelectedRole = createSelector(
    getRoleState,
    (state: RoleState) => state.selectedRole
);

export const getRole = createSelector(
    getRoleState,
    (state: RoleState) => state.role
);

export const getEditedRole = createSelector(
    getRoleState,
    (state: RoleState) => state.editedRole
);

export const getRolesLoading = createSelector<RoleState, RoleState, boolean>(
    getRoleState,
    (state: RoleState) => state.rolesLoading
);

export const getRoleSaved = createSelector<RoleState, RoleState, boolean>(
    getRoleState,
    (state: RoleState) => state.roleSaved
);

export const getRoleSaving = createSelector<RoleState, RoleState, boolean>(
    getRoleState,
    (state: RoleState) => state.roleSaving
);

export const getRoleDeleteEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.DELETE_ROLE)
);

export const getRoleEditEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.EDIT_ROLE)
);

export const getRoleCreateEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.CREATE_ROLE)
);

export const getRoleEditing = createSelector<
    RoleState,
    RouterReducerState<AppRouterState>,
    boolean
>(
    getRouterState,
    router =>
        router.state.url.includes(`${ROLE_ROUTE}/new`) ||
        router.state.url.includes(`${ROLE_ROUTE}/edit`)
);

export const getRoleSavingError = createSelector<RoleState, RoleState, HttpErrorResponse>(
    getRoleState,
    (state: RoleState) => state.roleSavingError
);
