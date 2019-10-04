import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ListCriteria } from '../../../shared/types/list-criteria.interface';
import { Paginated } from '../../../shared/types/paginated.interface';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';

export const enum RoleActionTypes {
    LOAD_ROLES = '[Role] Load Roles',
    LOAD_ROLES_FAIL = '[Role] Load Roles Fail',
    LOAD_ROLES_SUCCESS = '[Role] Load Roles Success',
    LOAD_ROLE = '[Role] Load Role',
    LOAD_ROLE_FAIL = '[Role] Load Role Fail',
    LOAD_ROLE_SUCCESS = '[Role] Load Role Success',
    LOAD_PRIVILEGES = '[Role] Load Privileges',
    LOAD_PRIVILEGES_FAIL = '[Role] Load Privileges Fail',
    LOAD_PRIVILEGES_SUCCESS = '[Role] Load Privileges Success',
    SELECT_ROLE = '[Role] Select Role',
    EDIT_ROLE = '[Role] Edit Role',
    ADD_ROLE = '[Role] Add Role',
    DELETE_ROLE = '[Role] Delete Role',
    DELETE_ROLE_FAIL = '[Role] Delete Role Fail',
    DELETE_ROLE_SUCCESS = '[Role] Delete Role Success',
    SAVE_ROLE = '[Role] Save Role',
    SAVE_ROLE_FAIL = '[Role] Save Role Fail',
    SAVE_ROLE_SUCCESS = '[Role] Save Role Success',
    REMOVE_EDITED_ROLE = '[Role] Remove Edited Role',
    CLEAR_ROLE_SAVING_ERROR = '[Role] Clear Role Saving Error'
}

export class LoadRoles implements Action {
    readonly type = RoleActionTypes.LOAD_ROLES;
    constructor(public payload?: ListCriteria) {}
}

export class LoadRolesFail implements Action {
    readonly type = RoleActionTypes.LOAD_ROLES_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadRolesSuccess implements Action {
    readonly type = RoleActionTypes.LOAD_ROLES_SUCCESS;
    constructor(public payload: Paginated<Role>) {}
}

export class LoadRole implements Action {
    readonly type = RoleActionTypes.LOAD_ROLE;
    constructor(public payload?: string) {}
}

export class LoadRoleFail implements Action {
    readonly type = RoleActionTypes.LOAD_ROLE_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadRoleSuccess implements Action {
    readonly type = RoleActionTypes.LOAD_ROLE_SUCCESS;
    constructor(public payload: Role) {}
}

export class LoadPrivileges implements Action {
    readonly type = RoleActionTypes.LOAD_PRIVILEGES;
}

export class LoadPrivilegesFail implements Action {
    readonly type = RoleActionTypes.LOAD_PRIVILEGES_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadPrivilegesSuccess implements Action {
    readonly type = RoleActionTypes.LOAD_PRIVILEGES_SUCCESS;
    constructor(public payload: Privilege[]) {}
}

export class SelectRole implements Action {
    readonly type = RoleActionTypes.SELECT_ROLE;
    constructor(public payload: Role) {}
}

export class EditRole implements Action {
    readonly type = RoleActionTypes.EDIT_ROLE;
    constructor(public payload: Role) {}
}

export class AddRole implements Action {
    readonly type = RoleActionTypes.ADD_ROLE;
}

export class DeleteRole implements Action {
    readonly type = RoleActionTypes.DELETE_ROLE;
    constructor(public payload: Role) {}
}

export class DeleteRoleFail implements Action {
    readonly type = RoleActionTypes.DELETE_ROLE_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class DeleteRoleSuccess implements Action {
    readonly type = RoleActionTypes.DELETE_ROLE_SUCCESS;
}

export class SaveRole implements Action {
    readonly type = RoleActionTypes.SAVE_ROLE;
    constructor(public payload: Role) {}
}

export class SaveRoleFail implements Action {
    readonly type = RoleActionTypes.SAVE_ROLE_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class SaveRoleSuccess implements Action {
    readonly type = RoleActionTypes.SAVE_ROLE_SUCCESS;
    constructor(public payload: Role) {}
}

export class RemoveEditedRole implements Action {
    readonly type = RoleActionTypes.REMOVE_EDITED_ROLE;
}

export class ClearRoleSavingError implements Action {
    readonly type = RoleActionTypes.CLEAR_ROLE_SAVING_ERROR;
}

export type RoleAction =
    | LoadRoles
    | LoadRolesFail
    | LoadRolesSuccess
    | LoadRole
    | LoadRoleFail
    | LoadRoleSuccess
    | LoadPrivileges
    | LoadPrivilegesFail
    | LoadPrivilegesSuccess
    | SelectRole
    | EditRole
    | AddRole
    | DeleteRole
    | DeleteRoleFail
    | DeleteRoleSuccess
    | SaveRole
    | SaveRoleFail
    | SaveRoleSuccess
    | RemoveEditedRole
    | ClearRoleSavingError;
