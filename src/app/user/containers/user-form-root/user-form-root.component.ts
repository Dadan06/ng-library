import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { Role } from 'src/app/role/types/role.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { USER_BASE_ROUTE } from '../../constants/user.constant';
import { SaveUser } from '../../store/actions/user.actions';
import { UserState } from '../../store/reducers/user.reducers';
import {
    getCurrentUser,
    getRoles,
    getUserEditEnabled,
    getUserEditing,
    getUserSavingError
} from '../../store/selectors/user.selectors';
import { User } from '../../types/user.interface';

@Component({
    selector: 'app-user-form-root',
    templateUrl: './user-form-root.component.html',
    styleUrls: ['./user-form-root.component.scss']
})
export class UserFormRootComponent implements OnInit {
    user$: Observable<User>;
    currentUser$: Observable<User>;
    roles$: Observable<Role[]>;
    isEditing$: Observable<boolean>;
    userEditEnabled$: Observable<boolean>;
    userSavingError$: Subscription;

    constructor(
        private userStore: Store<UserState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.user$ = this.userStore.pipe(select(getCurrentUser));
        this.roles$ = this.userStore.pipe(select(getRoles));
        this.isEditing$ = this.userStore.pipe(select(getUserEditing));
        this.userEditEnabled$ = this.authenticationStore.pipe(select(getUserEditEnabled));
    }

    get getError() {
        let err = '';
        this.userStore.pipe(select(getUserSavingError)).subscribe(error => {
            if (error !== undefined) {
                err = error.error.message;
            }
        });
        return err;
    }

    onEdit(user: User) {
        go(this.userStore, [`${USER_BASE_ROUTE}/edit`, user._id]);
    }

    onSave(user: User) {
        this.userStore.dispatch(new SaveUser(user));
    }

    onCancelEdit(user: User) {
        go(
            this.userStore,
            user._id ? [`${USER_BASE_ROUTE}/detail`, user._id] : [`${USER_BASE_ROUTE}`]
        );
    }
}
