import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { RoleState } from '../../store/reducers/role.reducer';
import { getPrivileges, getRole, getRoleEditing } from '../../store/selectors/role.selectors';
import { Privilege } from '../../types/privilege.interface';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-detail-root',
    templateUrl: './role-detail-root.component.html',
    styleUrls: ['./role-detail-root.component.scss']
})
export class RoleDetailRootComponent implements OnInit {
    role$: Observable<Role>;
    isEditing$: Observable<boolean>;
    existingPrivileges: Observable<Privilege[]>;

    constructor(private store: Store<RoleState>) {}

    ngOnInit(): void {
        this.role$ = this.store.pipe(select(getRole));
        this.isEditing$ = this.store.pipe(select(getRoleEditing));
        this.existingPrivileges = this.store.pipe(select(getPrivileges));
    }
}
