import { HttpErrorResponse } from '@angular/common/http';
import { Role } from 'src/app/role/types/role.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { USER_DEFAULT_CRITERIA } from '../../constants/user.constant';
import { User } from '../../types/user.interface';
import {
    DeleteUser,
    DeleteUserFail,
    DeleteUserSuccess,
    LoadAllRole,
    LoadAllRoleFail,
    LoadAllRoleSuccess,
    LoadUser,
    LoadUserFail,
    LoadUsers,
    LoadUsersFail,
    LoadUsersSuccess,
    LoadUserSuccess,
    SaveUser,
    SaveUserFail,
    SaveUserSuccess,
    UserAction,
    UserActionTypes
} from '../actions/user.actions';

export interface UserState {
    users: Paginated<User>;
    usersLoaded: boolean;
    usersLoading: boolean;
    userCriteria: ListCriteria;
    user: User;
    userLoaded: boolean;
    userLoading: boolean;
    userSaved: boolean;
    userSaving: boolean;
    userSavingError: HttpErrorResponse;
    userDeleting: boolean;
    userDeleted: boolean;
    roles: Role[];
    rolesLoaded: boolean;
    rolesLoading: boolean;
}

const initialState: UserState = {
    users: { items: [], totalItems: 0 },
    usersLoaded: false,
    usersLoading: false,
    userCriteria: USER_DEFAULT_CRITERIA,
    user: undefined,
    userLoaded: false,
    userLoading: false,
    userSaving: false,
    userSaved: false,
    userSavingError: undefined,
    userDeleting: false,
    userDeleted: false,
    roles: [],
    rolesLoaded: false,
    rolesLoading: false
};

const loadUsers = (state: UserState, action: LoadUsers): UserState => ({
    ...state,
    usersLoading: true,
    usersLoaded: false,
    userCriteria: action.payload
});

const loadUsersFail = (state: UserState, action: LoadUsersFail): UserState => ({
    ...state,
    usersLoading: false,
    usersLoaded: false
});

const loadUsersSuccess = (state: UserState, action: LoadUsersSuccess): UserState => ({
    ...state,
    usersLoading: false,
    usersLoaded: true,
    users: action.payload
});

const loadUser = (state: UserState, action: LoadUser): UserState => ({
    ...state,
    userLoading: true,
    userLoaded: false
});

const loadUserFail = (state: UserState, action: LoadUserFail): UserState => ({
    ...state,
    userLoading: false,
    userLoaded: false
});

const loadUserSuccess = (state: UserState, action: LoadUserSuccess): UserState => ({
    ...state,
    userLoading: false,
    userLoaded: true,
    user: action.payload
});

const saveUser = (state: UserState, action: SaveUser): UserState => ({
    ...state,
    userSaving: true,
    userSaved: false
});

const saveUserFail = (state: UserState, action: SaveUserFail): UserState => ({
    ...state,
    userSaving: false,
    userSaved: false,
    userSavingError: action.payload
});

const saveUserSuccess = (state: UserState, action: SaveUserSuccess): UserState => ({
    ...state,
    userSaving: false,
    userSaved: true
});

const deleteUser = (state: UserState, action: DeleteUser): UserState => ({
    ...state,
    userDeleting: true,
    userDeleted: false
});

const deleteUserFail = (state: UserState, action: DeleteUserFail): UserState => ({
    ...state,
    userDeleting: false,
    userSaved: false
});

const deleteUserSuccess = (state: UserState, action: DeleteUserSuccess): UserState => ({
    ...state,
    userDeleting: false,
    userDeleted: true
});

const loadAllRole = (state: UserState, action: LoadAllRole): UserState => ({
    ...state,
    rolesLoaded: false,
    rolesLoading: true
});

const loadAllRoleFail = (state: UserState, action: LoadAllRoleFail): UserState => ({
    ...state,
    rolesLoaded: false,
    rolesLoading: false
});

const loadAllRoleSuccess = (state: UserState, action: LoadAllRoleSuccess): UserState => ({
    ...state,
    rolesLoaded: true,
    rolesLoading: false,
    roles: action.payload
});

// tslint:disable-next-line:cyclomatic-complexity
export function userReducer(state: UserState = initialState, action: UserAction): UserState {
    switch (action.type) {
        case UserActionTypes.LOAD_USERS:
            return loadUsers(state, action);
        case UserActionTypes.LOAD_USERS_FAIL:
            return loadUsersFail(state, action);
        case UserActionTypes.LOAD_USERS_SUCCESS:
            return loadUsersSuccess(state, action);
        case UserActionTypes.LOAD_USER:
            return loadUser(state, action);
        case UserActionTypes.LOAD_USER_FAIL:
            return loadUserFail(state, action);
        case UserActionTypes.LOAD_USER_SUCCESS:
            return loadUserSuccess(state, action);
        case UserActionTypes.SAVE_USER:
            return saveUser(state, action);
        case UserActionTypes.SAVE_USER_FAIL:
            return saveUserFail(state, action);
        case UserActionTypes.SAVE_USER_SUCCESS:
            return saveUserSuccess(state, action);
        case UserActionTypes.DELETE_USER:
            return deleteUser(state, action);
        case UserActionTypes.DELETE_USER_FAIL:
            return deleteUserFail(state, action);
        case UserActionTypes.DELETE_USER_SUCCESS:
            return deleteUserSuccess(state, action);
        case UserActionTypes.LOAD_ALL_ROLE:
            return loadAllRole(state, action);
        case UserActionTypes.LOAD_ALL_ROLE_FAIL:
            return loadAllRoleFail(state, action);
        case UserActionTypes.LOAD_ALL_ROLE_SUCCESS:
            return loadAllRoleSuccess(state, action);
        case UserActionTypes.CLEAR_USER_SAVING_ERROR:
            return { ...state, userSavingError: undefined };
        default:
            return state;
    }
}
