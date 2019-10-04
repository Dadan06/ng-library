import { HttpErrorResponse } from '@angular/common/http';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { AppRouterState } from '../../../core/store/reducers/router.reducers';
import { getRouterState } from '../../../core/store/selectors/router.selectors';
import { User } from '../../types/user.interface';
import { UserState } from '../reducers/user.reducers';

export const getUserState = createFeatureSelector<UserState>('user');

export const getPaginatedUsers = createSelector(
    getUserState,
    (state: UserState) => state.users
);

export const getUsers = createSelector(
    getPaginatedUsers,
    (paginatedUsers: Paginated<User>) => paginatedUsers.items
);

export const getRoles = createSelector(
    getUserState,
    (state: UserState) => state.roles
);

export const getUsersTotalItems = createSelector(
    getPaginatedUsers,
    (paginatedUsers: Paginated<User>) => paginatedUsers.totalItems
);

export const getUserCriteria = createSelector(
    getUserState,
    (state: UserState) => state.userCriteria
);

export const getUsersLoading = createSelector<UserState, UserState, boolean>(
    getUserState,
    (state: UserState) => state.usersLoading
);

export const getCurrentUser = createSelector(
    getUserState,
    (state: UserState) => state.user
);

export const getUserLoading = createSelector<UserState, UserState, boolean>(
    getUserState,
    (state: UserState) => state.userLoading
);

export const getUserSaving = createSelector<UserState, UserState, boolean>(
    getUserState,
    (state: UserState) => state.userSaving
);

export const getUserSaved = createSelector<UserState, UserState, boolean>(
    getUserState,
    (state: UserState) => state.userSaved
);

export const getUserEditEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.EDIT_USER)
);

export const getUserDeleteEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.DELETE_USER)
);

export const getUserCreateEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.CREATE_USER)
);

export const getUserEditing = createSelector<
    UserState,
    RouterReducerState<AppRouterState>,
    boolean
>(
    getRouterState,
    router => router.state.url.includes('user/edit') || router.state.url.includes('user/new')
);

export const getUserSavingError = createSelector<UserState, UserState, HttpErrorResponse>(
    getUserState,
    (state: UserState) => state.userSavingError
);
