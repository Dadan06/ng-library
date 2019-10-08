import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ROLE_ROUTE } from 'src/app/role/constants/role.constant';
import { Role } from 'src/app/role/types/role.interface';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { EMPTY_USER, USER_ROUTE } from '../constants/user.constant';
import { User } from '../types/user.interface';

@Injectable()
export class UserService {
    constructor(private http: HttpClient) {}

    loadUsers(criteria: ListCriteria): Observable<Paginated<User>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${USER_ROUTE}`, { params: flatten(criteria) })
            .pipe(map((response: ApiResponse) => response.data as Paginated<User>));
    }

    loadUser(userId: string): Observable<User> {
        return this.http
            .get(`${environment.apiBaseUrl}/${USER_ROUTE}/${userId}`)
            .pipe(map((response: ApiResponse) => response.data as User));
    }

    userFactory(): Observable<User> {
        return of(EMPTY_USER);
    }

    deleteUser(user: User): Observable<void> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${USER_ROUTE}/${user._id}`)
            .pipe(map(() => null));
    }

    saveUser(user: User): Observable<User> {
        return user._id
            ? this.http
                  .put(`${environment.apiBaseUrl}/${USER_ROUTE}/${user._id}`, user)
                  .pipe(map((response: ApiResponse) => response.data as User))
            : this.http
                  .post(`${environment.apiBaseUrl}/${USER_ROUTE}`, user)
                  .pipe(map((response: ApiResponse) => response.data as User));
    }

    loadRoles(): Observable<Role[]> {
        return this.http
            .get(`${environment.apiBaseUrl}/${ROLE_ROUTE}/all`)
            .pipe(map((response: ApiResponse) => response.data as Role[]));
    }
}
