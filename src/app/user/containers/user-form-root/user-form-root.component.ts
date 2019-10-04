import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { Role } from 'src/app/role/types/role.interface';
import { Go } from '../../../core/store/actions/router.actions';
import { USER_BASE_ROUTE } from '../../constants/user.constant';
import { ClearUserSavingError, SaveUser } from '../../store/actions/user.actions';
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

    @ViewChild('userSavingErrorModal') userSavingErrorModal: ModalComponent;

    constructor(
        private userStore: Store<UserState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.user$ = this.userStore.pipe(select(getCurrentUser));
        this.roles$ = this.userStore.pipe(select(getRoles));
        this.isEditing$ = this.userStore.pipe(select(getUserEditing));
        this.userEditEnabled$ = this.authenticationStore.pipe(select(getUserEditEnabled));
        this.userSavingError$ = this.userStore.pipe(select(getUserSavingError)).subscribe(error => {
            if (error !== undefined) {
                this.userSavingErrorModal.open();
            }
        });
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
        this.go([`${USER_BASE_ROUTE}/edit`, user._id]);
    }

    onSave(user: User) {
        this.userStore.dispatch(new SaveUser(user));
    }

    onCancelEdit(user: User) {
        this.go(user._id ? [`${USER_BASE_ROUTE}/detail`, user._id] : [`${USER_BASE_ROUTE}`]);
    }

    onCloseUserSavingErrorModal() {
        this.userStore.dispatch(new ClearUserSavingError());
        this.userSavingErrorModal.close();
    }

    private go(path: string[]) {
        this.userStore.dispatch(new Go({ path }));
    }
}
