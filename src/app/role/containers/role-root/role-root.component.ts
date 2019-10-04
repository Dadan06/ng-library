import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Page } from '../../../shared/types/page.interface';
import { subscribeModal } from '../../../shared/utils/modal.utils';
import { ROLE_DEFAULT_CRITERIA } from '../../constants/role.constant';
import {
    AddRole,
    DeleteRole,
    EditRole,
    LoadRoles,
    SelectRole
} from '../../store/actions/role.actions';
import { RoleState } from '../../store/reducers/role.reducer';
import {
    getRole,
    getRoleCreateEnabled,
    getRoleDeleteEnabled,
    getRoleEditEnabled,
    getRoles,
    getRoleSaved,
    getRolesLoading,
    getRolesTotalItems
} from '../../store/selectors/role.selectors';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-root',
    templateUrl: './role-root.component.html',
    styleUrls: ['./role-root.component.scss']
})
export class RoleRootComponent implements OnInit {
    rolesLoading$: Observable<boolean>;
    roles$: Observable<Role[]>;
    selectedRole$: Observable<Role>;
    roleEditEnabled$: Observable<boolean>;
    roleDeleteEnabled$: Observable<boolean>;
    roleCreatedEnabled$: Observable<boolean>;
    totalItems$: Observable<number>;
    roleToBeDeleted: Role;
    roleCriteria: ListCriteria = cloneDeep(ROLE_DEFAULT_CRITERIA);

    @ViewChild('saveSuccessModal') saveSuccessModal: ModalComponent;
    @ViewChild('deleteWarningModal') deleteWarningModal: ModalComponent;

    constructor(
        private store: Store<RoleState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.roles$ = this.store.pipe(select(getRoles));
        this.roleEditEnabled$ = this.authenticationStore.pipe(select(getRoleEditEnabled));
        this.roleDeleteEnabled$ = this.authenticationStore.pipe(select(getRoleDeleteEnabled));
        this.roleCreatedEnabled$ = this.authenticationStore.pipe(select(getRoleCreateEnabled));
        this.rolesLoading$ = this.store.pipe(select(getRolesLoading));
        this.totalItems$ = this.store.pipe(select(getRolesTotalItems));
        this.selectedRole$ = this.store.pipe(select(getRole));
        this.subscribeModals();
    }

    onPaginate(page: Page) {
        this.roleCriteria.page = page;
        this.store.dispatch(new LoadRoles({ ...this.roleCriteria }));
    }

    onViewDetails(role: Role) {
        this.store.dispatch(new SelectRole(role));
    }

    onEdit(role: Role) {
        this.store.dispatch(new EditRole(role));
    }

    onCreate() {
        this.store.dispatch(new AddRole());
    }

    deleteRole(role: Role) {
        this.roleToBeDeleted = role;
        this.deleteWarningModal.open();
    }

    onDeleteRole() {
        this.store.dispatch(new DeleteRole(this.roleToBeDeleted));
        this.deleteWarningModal.close();
    }

    onSearch(search: string) {
        this.roleCriteria.search = search;
        this.store.dispatch(new LoadRoles({ ...this.roleCriteria }));
    }

    private subscribeModals() {
        subscribeModal(this.store, getRoleSaved, true, this.saveSuccessModal);
    }
}
