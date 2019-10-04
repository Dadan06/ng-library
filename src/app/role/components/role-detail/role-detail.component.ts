import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import {
    PRIVILEGE_CATEGORY_LABELS,
    USER_PRIVILEGE_LABELS
} from '../../constants/privilege.constants';
import { EditRole } from '../../store/actions/role.actions';
import { RoleState } from '../../store/reducers/role.reducer';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-detail',
    templateUrl: './role-detail.component.html',
    styleUrls: ['./role-detail.component.scss']
})
export class RoleDetailComponent {
    @Input() role: Role;
    @Input() isEditing: boolean;
    @Input() existingPrivileges: Privilege[];

    categoryLabels = PRIVILEGE_CATEGORY_LABELS;
    userPrivilegeLabels = USER_PRIVILEGE_LABELS;

    constructor(private store: Store<RoleState>) {}

    get groupedPrivileges() {
        return (
            this.existingPrivileges &&
            this.existingPrivileges.reduce((acc, obj) => {
                const key = obj.category;
                if (!acc[key]) {
                    acc[key] = [];
                }
                acc[key].push(obj);
                return acc;
            }, {})
        );
    }

    get categoryList() {
        return this.groupedPrivileges && Object.keys(this.groupedPrivileges);
    }

    userHasPrivilege(privilege: Privilege): boolean {
        return this.role.privileges && this.role.privileges.map(p => p._id).includes(privilege._id);
    }

    edit(): void {
        this.store.dispatch(new EditRole(this.role));
    }
}
