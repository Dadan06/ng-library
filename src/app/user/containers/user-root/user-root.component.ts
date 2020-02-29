import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { USER_BASE_ROUTE, USER_DEFAULT_CRITERIA } from '../../constants/user.constant';
import { DeleteUser, LoadUsers } from '../../store/actions/user.actions';
import { UserState } from '../../store/reducers/user.reducers';
import {
    getCurrentUser,
    getUserCreateEnabled,
    getUserDeleteEnabled,
    getUserEditEnabled,
    getUsers,
    getUserSaved,
    getUsersLoading,
    getUsersTotalItems
} from '../../store/selectors/user.selectors';
import { User } from '../../types/user.interface';

@Component({
    selector: 'app-user-root',
    templateUrl: './user-root.component.html',
    styleUrls: ['./user-root.component.scss']
})
export class UserRootComponent implements OnInit {
    users$: Observable<User[]>;
    usersLoading$: Observable<boolean>;
    userEditEnabled$: Observable<boolean>;
    userDeleteEnabled$: Observable<boolean>;
    userCreateEnabled$: Observable<boolean>;
    totalItems$: Observable<number>;
    currentUser$: Observable<User>;
    userCriteria: ListCriteria = cloneDeep(USER_DEFAULT_CRITERIA);
    toBeDeletedUser: User;

    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;
    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;

    constructor(
        private userStore: Store<UserState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.users$ = this.userStore.pipe(select(getUsers));
        this.usersLoading$ = this.userStore.pipe(select(getUsersLoading));
        this.totalItems$ = this.userStore.pipe(select(getUsersTotalItems));
        this.userEditEnabled$ = this.authenticationStore.pipe(select(getUserEditEnabled));
        this.userDeleteEnabled$ = this.authenticationStore.pipe(select(getUserDeleteEnabled));
        this.userCreateEnabled$ = this.authenticationStore.pipe(select(getUserCreateEnabled));
        this.currentUser$ = this.userStore.pipe(select(getCurrentUser));
        this.subscribeModals();
    }

    onSort(sort: Sort) {
        this.userCriteria.sort = sort;
        this.refreshList();
    }

    onSearch(search: string) {
        this.userCriteria.search = search;
        this.refreshList();
    }

    onViewDetail(user: User) {
        go(this.userStore, [`${USER_BASE_ROUTE}/detail`, user._id]);
    }

    onEdit(user: User) {
        go(this.userStore, [`${USER_BASE_ROUTE}/edit`, user._id]);
    }

    onDelete(user: User) {
        this.toBeDeletedUser = user;
        this.deletionConfirmModal.open();
    }

    onPaginate(page: Page) {
        this.userCriteria.page = page;
        this.refreshList();
    }

    onCreate() {
        go(this.userStore, [`${USER_BASE_ROUTE}/new`]);
    }

    onConfirmDeletion() {
        this.userStore.dispatch(new DeleteUser(this.toBeDeletedUser));
    }

    private subscribeModals() {
        subscribeModal(this.userStore, getUserSaved, true, this.successfullSavingModal);
    }

    private refreshList() {
        this.userStore.dispatch(new LoadUsers({ ...this.userCriteria }));
    }
}
