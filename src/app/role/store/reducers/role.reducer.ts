import { HttpErrorResponse } from '@angular/common/http';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from '../../../shared/types/paginated.interface';
import { ROLE_DEFAULT_CRITERIA } from '../../constants/role.constant';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';
import {
    DeleteRole,
    DeleteRoleFail,
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
    RemoveEditedRole,
    RoleAction,
    RoleActionTypes,
    SaveRole,
    SaveRoleFail,
    SaveRoleSuccess,
    SelectRole
} from '../actions/role.actions';

export interface RoleState {
    roles: Paginated<Role>;
    rolesLoaded: boolean;
    rolesLoading: boolean;
    roleCriteria: ListCriteria;
    role: Role;
    roleLoaded: boolean;
    roleLoading: boolean;
    roleSavingError: HttpErrorResponse;
    privilegesLoaded: boolean;
    privilegesLoading: boolean;
    selectedRole: Role;
    editedRole: Role;
    roleDeleted: boolean;
    roleDeleting: boolean;
    roleSaved: boolean;
    roleSaving: boolean;
    privileges: Privilege[];
}

const initialState: RoleState = {
    roles: { items: [], totalItems: 0 },
    rolesLoaded: false,
    rolesLoading: false,
    roleSavingError: undefined,
    roleCriteria: ROLE_DEFAULT_CRITERIA,
    role: undefined,
    roleLoaded: false,
    roleLoading: false,
    privilegesLoaded: false,
    privilegesLoading: false,
    selectedRole: undefined,
    editedRole: undefined,
    roleDeleted: false,
    roleDeleting: false,
    roleSaved: false,
    roleSaving: false,
    privileges: undefined
};

const loadRoles = (state: RoleState, action: LoadRoles): RoleState => ({
    ...state,
    rolesLoaded: false,
    rolesLoading: true,
    roleCriteria: action.payload
});

const loadRolesFail = (state: RoleState, action: LoadRolesFail): RoleState => ({
    ...state,
    rolesLoaded: false,
    rolesLoading: false
});

const loadRolesSuccess = (state: RoleState, action: LoadRolesSuccess): RoleState => ({
    ...state,
    rolesLoaded: true,
    rolesLoading: false,
    roles: action.payload
});

const loadRole = (state: RoleState, action: LoadRole): RoleState => ({
    ...state,
    roleLoaded: false,
    roleLoading: true
});

const loadRoleFail = (state: RoleState, action: LoadRoleFail): RoleState => ({
    ...state,
    roleLoaded: false,
    roleLoading: false
});

const loadRoleSuccess = (state: RoleState, action: LoadRoleSuccess): RoleState => ({
    ...state,
    roleLoaded: true,
    roleLoading: false,
    role: action.payload
});

const loadPrivileges = (state: RoleState, action: LoadPrivileges): RoleState => ({
    ...state,
    privilegesLoaded: false,
    privilegesLoading: true
});

const loadPrivilegesFail = (state: RoleState, action: LoadPrivilegesFail): RoleState => ({
    ...state,
    privilegesLoaded: false,
    privilegesLoading: false
});

const loadPrivilegesSuccess = (state: RoleState, action: LoadPrivilegesSuccess): RoleState => ({
    ...state,
    privilegesLoaded: false,
    privilegesLoading: false,
    privileges: action.payload
});

const selectRole = (state: RoleState, action: SelectRole): RoleState => ({
    ...state,
    selectedRole: action.payload
});

const editRole = (state: RoleState, action: EditRole): RoleState => ({
    ...state,
    editedRole: action.payload
});

const deleteRole = (state: RoleState, action: DeleteRole): RoleState => ({
    ...state,
    roleDeleted: false,
    roleDeleting: true
});

const deleteRoleFail = (state: RoleState, action: DeleteRoleFail): RoleState => ({
    ...state,
    roleDeleted: false,
    roleDeleting: false
});

const deleteRoleSuccess = (state: RoleState, action: DeleteRoleSuccess): RoleState => ({
    ...state,
    roleDeleted: true,
    roleDeleting: false,
    role: undefined
});

const saveRole = (state: RoleState, action: SaveRole): RoleState => ({
    ...state,
    roleSaved: false,
    roleSaving: true
});

const saveRoleFail = (state: RoleState, action: SaveRoleFail): RoleState => ({
    ...state,
    roleSaved: false,
    roleSaving: false,
    roleSavingError: action.payload
});

const saveRoleSuccess = (state: RoleState, action: SaveRoleSuccess): RoleState => ({
    ...state,
    roleSaved: true,
    roleSaving: false,
    selectedRole: action.payload
});

const removeEditedRole = (state: RoleState, action: RemoveEditedRole): RoleState => ({
    ...state,
    editedRole: undefined
});

// tslint:disable-next-line:cyclomatic-complexity no-big-function
export function roleReducer(state: RoleState = initialState, action: RoleAction): RoleState {
    switch (action.type) {
        case RoleActionTypes.LOAD_ROLES:
            return loadRoles(state, action);
        case RoleActionTypes.LOAD_ROLES_FAIL:
            return loadRolesFail(state, action);
        case RoleActionTypes.LOAD_ROLES_SUCCESS:
            return loadRolesSuccess(state, action);
        case RoleActionTypes.LOAD_ROLE:
            return loadRole(state, action);
        case RoleActionTypes.LOAD_ROLE_FAIL:
            return loadRoleFail(state, action);
        case RoleActionTypes.LOAD_ROLE_SUCCESS:
            return loadRoleSuccess(state, action);
        case RoleActionTypes.LOAD_PRIVILEGES:
            return loadPrivileges(state, action);
        case RoleActionTypes.LOAD_PRIVILEGES_FAIL:
            return loadPrivilegesFail(state, action);
        case RoleActionTypes.LOAD_PRIVILEGES_SUCCESS:
            return loadPrivilegesSuccess(state, action);
        case RoleActionTypes.SELECT_ROLE:
            return selectRole(state, action);
        case RoleActionTypes.EDIT_ROLE:
            return editRole(state, action);
        case RoleActionTypes.DELETE_ROLE:
            return deleteRole(state, action);
        case RoleActionTypes.DELETE_ROLE_FAIL:
            return deleteRoleFail(state, action);
        case RoleActionTypes.DELETE_ROLE_SUCCESS:
            return deleteRoleSuccess(state, action);
        case RoleActionTypes.SAVE_ROLE:
            return saveRole(state, action);
        case RoleActionTypes.SAVE_ROLE_FAIL:
            return saveRoleFail(state, action);
        case RoleActionTypes.SAVE_ROLE_SUCCESS:
            return saveRoleSuccess(state, action);
        case RoleActionTypes.REMOVE_EDITED_ROLE:
            return removeEditedRole(state, action);
        case RoleActionTypes.CLEAR_ROLE_SAVING_ERROR:
            return { ...state, roleSavingError: undefined };
        default:
            return state;
    }
}
