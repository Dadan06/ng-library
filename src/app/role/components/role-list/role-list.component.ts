import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
    @Input() roles: Role[];
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Input() currentRole: Role;
    @Output() view: EventEmitter<Role> = new EventEmitter();
    @Output() delete: EventEmitter<Role> = new EventEmitter();
    @Output() edit: EventEmitter<Role> = new EventEmitter<Role>();
    selectedIndex: number;
}
