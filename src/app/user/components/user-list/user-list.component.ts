import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../types/user.interface';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    @Input() users: User[];
    @Input() currentUser: User;
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Output() view: EventEmitter<User> = new EventEmitter<User>();
    @Output() edit: EventEmitter<User> = new EventEmitter<User>();
    @Output() delete: EventEmitter<User> = new EventEmitter<User>();
}
