import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { go } from 'src/app/shared/utils/go.utils';
import { ROLE_BASE_ROUTE } from '../../constants/role.constant';
import { SaveRole } from '../../store/actions/role.actions';
import { RoleState } from '../../store/reducers/role.reducer';
import { getPrivileges, getRole, getRoleEditing } from '../../store/selectors/role.selectors';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-form-root',
    templateUrl: './role-form-root.component.html',
    styleUrls: ['./role-form-root.component.scss']
})
export class RoleFormRootComponent implements OnInit {
    role$: Observable<Role>;
    privileges$: Observable<Privilege[]>;
    isEditing$: Observable<boolean>;

    constructor(private store: Store<RoleState>) {}

    ngOnInit() {
        this.role$ = this.store.pipe(select(getRole));
        this.privileges$ = this.store.pipe(select(getPrivileges));
        this.isEditing$ = this.store.pipe(select(getRoleEditing));
    }

    onCancelEdit(role: Role) {
        go(this.store, role._id ? [`${ROLE_BASE_ROUTE}/detail`, role._id] : [`${ROLE_BASE_ROUTE}`]);
    }

    onEdit(role: Role) {
        go(this.store, [`${ROLE_BASE_ROUTE}/edit`, role._id]);
    }

    onClose() {
        go(this.store, [`${ROLE_BASE_ROUTE}`]);
    }

    onSave(role: Role) {
        this.store.dispatch(new SaveRole(role));
    }
}
