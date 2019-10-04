import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { Observable, Subscription } from 'rxjs';
import { Go } from 'src/app/core/store/actions/router.actions';
import { ROLE_BASE_ROUTE } from '../../constants/role.constant';
import { ClearRoleSavingError, SaveRole } from '../../store/actions/role.actions';
import { RoleState } from '../../store/reducers/role.reducer';
import {
    getEditedRole,
    getPrivileges,
    getRoleSavingError
} from '../../store/selectors/role.selectors';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-form-root',
    templateUrl: './role-form-root.component.html',
    styleUrls: ['./role-form-root.component.scss']
})
export class RoleFormRootComponent implements OnInit {
    role: Observable<Role>;
    privileges: Observable<Privilege[]>;
    roleSavingError$: Subscription;

    @ViewChild('roleSavingErrorModal') roleSavingErrorModal: ModalComponent;

    constructor(private store: Store<RoleState>) {}

    get getError() {
        let err = '';
        this.store.pipe(select(getRoleSavingError)).subscribe(error => {
            if (error !== undefined) {
                err = error.error.message;
            }
        });
        return err;
    }

    ngOnInit() {
        this.role = this.store.pipe(select(getEditedRole));
        this.privileges = this.store.pipe(select(getPrivileges));
        this.roleSavingError$ = this.store.pipe(select(getRoleSavingError)).subscribe(error => {
            if (error !== undefined) {
                this.roleSavingErrorModal.open();
            }
        });
    }

    onCancel(role: Role) {
        this.go(role._id ? [`${ROLE_BASE_ROUTE}/detail`, role._id] : [`${ROLE_BASE_ROUTE}`]);
    }

    onSave(role: Role) {
        this.store.dispatch(new SaveRole(role));
    }

    onCloseRoleSavingErrorModal() {
        this.store.dispatch(new ClearRoleSavingError());
        this.roleSavingErrorModal.close();
    }

    private go(path: string[]) {
        this.store.dispatch(new Go({ path }));
    }
}
