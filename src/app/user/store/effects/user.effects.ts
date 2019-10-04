import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { Role } from 'src/app/role/types/role.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { USER_BASE_ROUTE } from '../../constants/user.constant';
import { UserService } from '../../services/user.service';
import { User } from '../../types/user.interface';
import {
    DeleteUser,
    DeleteUserFail,
    DeleteUserSuccess,
    LoadAllRole,
    LoadAllRoleFail,
    LoadAllRoleSuccess,
    LoadUser,
    LoadUserFail,
    LoadUsers,
    LoadUsersFail,
    LoadUsersSuccess,
    LoadUserSuccess,
    SaveUser,
    SaveUserFail,
    SaveUserSuccess,
    UserActionTypes
} from '../actions/user.actions';
import { UserState } from '../reducers/user.reducers';
import { getUserCriteria } from '../selectors/user.selectors';

@Injectable()
export class UserEffects {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private store: Store<UserState>
    ) {}

    @Effect()
    loadUsers$ = this.action$.pipe(
        ofType(UserActionTypes.LOAD_USERS),
        switchMap(
            (action: LoadUsers): Observable<Paginated<User>> =>
                this.userService.loadUsers(action.payload)
        ),
        map((response: Paginated<User>) => new LoadUsersSuccess(response)),
        catchError(error => of(new LoadUsersFail(error)))
    );

    @Effect()
    loadUser$ = this.action$.pipe(
        ofType(UserActionTypes.LOAD_USER),
        switchMap(
            (action: LoadUser): Observable<User> => this.userService.loadUser(action.payload)
        ),
        map((response: User) => new LoadUserSuccess(response)),
        catchError(error => of(new LoadUserFail(error)))
    );

    @Effect()
    saveUser$ = this.action$.pipe(
        ofType(UserActionTypes.SAVE_USER),
        mergeMap((action: SaveUser) =>
            this.userService.saveUser(action.payload).pipe(
                map((response: User) => new SaveUserSuccess(response)),
                catchError(error => of(new SaveUserFail(error)))
            )
        )
    );

    @Effect()
    saveUserSuccess$ = this.action$.pipe(
        ofType(UserActionTypes.SAVE_USER_SUCCESS),
        map((action: SaveUserSuccess) => action.payload),
        withLatestFrom(this.store.pipe(select(getUserCriteria))),
        mergeMap(([user, criteria]) => [
            new LoadUsers(criteria),
            new Go({
                path: [`${USER_BASE_ROUTE}/detail/${user._id}`]
            })
        ])
    );

    @Effect()
    deleteUser$ = this.action$.pipe(
        ofType(UserActionTypes.DELETE_USER),
        switchMap(
            (action: DeleteUser): Observable<void> => this.userService.deleteUser(action.payload)
        ),
        mergeMap(() => [
            new DeleteUserSuccess(),
            new Go({
                path: [USER_BASE_ROUTE]
            })
        ]),
        catchError(error => of(new DeleteUserFail(error)))
    );

    @Effect()
    deleteUserSuccess$ = this.action$.pipe(
        ofType(UserActionTypes.DELETE_USER_SUCCESS),
        withLatestFrom(this.store.pipe(select(getUserCriteria))),
        map(([action, criteria]) => new LoadUsers(criteria))
    );

    @Effect()
    loadAllRole$ = this.action$.pipe(
        ofType(UserActionTypes.LOAD_ALL_ROLE),
        switchMap((action: LoadAllRole): Observable<Role[]> => this.userService.loadRoles()),
        map((response: Role[]) => new LoadAllRoleSuccess(response)),
        catchError(error => of(new LoadAllRoleFail(error)))
    );
}
