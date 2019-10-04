import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Role } from 'src/app/role/types/role.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { User } from '../../types/user.interface';

export const enum UserActionTypes {
    LOAD_USERS = '[User] Load Users',
    LOAD_USERS_FAIL = '[User] Load Users Fail',
    LOAD_USERS_SUCCESS = '[User] Load Users Success',
    LOAD_USER = '[User] Load User',
    LOAD_USER_FAIL = '[User] Load User Fail',
    LOAD_USER_SUCCESS = '[User] Load User Success',
    DELETE_USER = '[User] Delete User',
    DELETE_USER_FAIL = '[User] Delete User Fail',
    DELETE_USER_SUCCESS = '[User] Delete User Success',
    SAVE_USER = '[User] Save User',
    SAVE_USER_FAIL = '[User] Save User Fail',
    SAVE_USER_SUCCESS = '[User] Save User Success',
    LOAD_ALL_ROLE = '[Role] Load All Role',
    LOAD_ALL_ROLE_FAIL = '[Role] Load All Role Fail',
    LOAD_ALL_ROLE_SUCCESS = '[Role] Load All Role Success',
    CLEAR_USER_SAVING_ERROR = '[User] Clear User Saving Error'
}

export class LoadUsers implements Action {
    readonly type = UserActionTypes.LOAD_USERS;
    constructor(public payload: ListCriteria) {}
}

export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USERS_SUCCESS;
    constructor(public payload: Paginated<User>) {}
}

export class LoadUsersFail implements Action {
    readonly type = UserActionTypes.LOAD_USERS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadUser implements Action {
    readonly type = UserActionTypes.LOAD_USER;
    constructor(public payload: string) {}
}

export class LoadUserSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class LoadUserFail implements Action {
    readonly type = UserActionTypes.LOAD_USER_FAIL;
    constructor(public payload: Error) {}
}

export class SaveUser implements Action {
    readonly type = UserActionTypes.SAVE_USER;
    constructor(public payload: User) {}
}

export class SaveUserFail implements Action {
    readonly type = UserActionTypes.SAVE_USER_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class SaveUserSuccess implements Action {
    readonly type = UserActionTypes.SAVE_USER_SUCCESS;
    constructor(public payload: User) {}
}

export class DeleteUser implements Action {
    readonly type = UserActionTypes.DELETE_USER;
    constructor(public payload: User) {}
}

export class DeleteUserFail implements Action {
    readonly type = UserActionTypes.DELETE_USER_FAIL;
    constructor(public payload: Error) {}
}

export class DeleteUserSuccess implements Action {
    readonly type = UserActionTypes.DELETE_USER_SUCCESS;
}

export class LoadAllRole implements Action {
    readonly type = UserActionTypes.LOAD_ALL_ROLE;
}

export class LoadAllRoleFail implements Action {
    readonly type = UserActionTypes.LOAD_ALL_ROLE_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadAllRoleSuccess implements Action {
    readonly type = UserActionTypes.LOAD_ALL_ROLE_SUCCESS;
    constructor(public payload: Role[]) {}
}

export class ClearUserSavingError implements Action {
    readonly type = UserActionTypes.CLEAR_USER_SAVING_ERROR;
}

export type UserAction =
    | LoadUsers
    | LoadUsersSuccess
    | LoadUsersFail
    | LoadUser
    | LoadUserSuccess
    | LoadUserFail
    | DeleteUser
    | DeleteUserFail
    | DeleteUserSuccess
    | SaveUser
    | SaveUserFail
    | SaveUserSuccess
    | LoadAllRole
    | LoadAllRoleFail
    | LoadAllRoleSuccess
    | ClearUserSavingError;
