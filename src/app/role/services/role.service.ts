import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from 'src/app/shared/types/api-response.interface';
import { flatten } from 'src/app/shared/utils/flatten';
import { environment } from 'src/environments/environment';
import { ListCriteria } from '../../shared/types/list-criteria.interface';
import { Paginated } from '../../shared/types/paginated.interface';
import { PRIVILEGE_ROUTE } from '../constants/privilege.constants';
import { EMPTY_ROLE, ROLE_ROUTE } from '../constants/role.constant';
import { Privilege } from '../types/privilege.interface';
import { Role } from '../types/role.interface';
@Injectable()
export class RoleService {
    constructor(private http: HttpClient) {}

    loadRoles(criteria: ListCriteria): Observable<Paginated<Role>> {
        return this.http
            .get(`${environment.apiBaseUrl}/${ROLE_ROUTE}`, { params: flatten(criteria) })
            .pipe(map((result: ApiResponse) => result.data as Paginated<Role>));
    }

    loadRole(roleId: string): Observable<Role> {
        return this.http
            .get(`${environment.apiBaseUrl}/${ROLE_ROUTE}/${roleId}`)
            .pipe(map((result: ApiResponse) => result.data as Role));
    }

    saveRole(role: Role): Observable<Role> {
        return role._id
            ? this.http
                  .put(`${environment.apiBaseUrl}/${ROLE_ROUTE}/${role._id}`, role)
                  .pipe(map((result: ApiResponse) => result.data as Role))
            : this.http
                  .post(`${environment.apiBaseUrl}/${ROLE_ROUTE}`, { ...role, _id: undefined })
                  .pipe(map((result: ApiResponse) => result.data as Role));
    }

    deleteRole(role: Role): Observable<boolean> {
        return this.http
            .delete(`${environment.apiBaseUrl}/${ROLE_ROUTE}/${role._id}`)
            .pipe(map((result: ApiResponse) => result.message === 'Role successfully deleted'));
    }

    loadPrivileges(): Observable<Privilege[]> {
        return this.http
            .get(`${environment.apiBaseUrl}/${PRIVILEGE_ROUTE}/all`)
            .pipe(map((response: ApiResponse) => response.data as Privilege[]));
    }

    roleFactory(): Observable<Role> {
        return of(EMPTY_ROLE);
    }

    checkDuplicate(role: Role): Observable<object | null> {
        return this.http.post(`${environment.apiBaseUrl}/${ROLE_ROUTE}/check-duplicate`, role).pipe(
            map((response: ApiResponse) => (response.data as unknown) as boolean),
            map(hasDuplicate => (hasDuplicate ? { duplicateEntry: true } : null))
        );
    }
}
