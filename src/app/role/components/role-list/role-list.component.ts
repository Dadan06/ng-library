import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';
import { Role } from '../../types/role.interface';

@Component({
    selector: 'app-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent extends SortableTableComponent {
    @Input() roles: Role[];
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Input() currentRole: Role;
    @Output() view: EventEmitter<Role> = new EventEmitter();
    @Output() delete: EventEmitter<Role> = new EventEmitter();
    @Output() edit: EventEmitter<Role> = new EventEmitter<Role>();
    selectedIndex: number;
}
