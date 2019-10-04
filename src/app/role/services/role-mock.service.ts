import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { paginate } from 'src/app/shared/utils/paginate';
import { ListCriteria } from '../../shared/types/list-criteria.interface';
import { Paginated } from '../../shared/types/paginated.interface';
import { EMPTY_ROLE } from '../constants/role.constant';
import { PRIVILEGES_MOCK } from '../models/privileges.mock';
import { ROLES_MOCK } from '../models/roles.mock';
import { Privilege } from '../types/privilege.interface';
import { Role } from '../types/role.interface';
import { RoleServiceInterface } from './role-service.interface';

@Injectable()
export class RoleMockService implements RoleServiceInterface {
    constructor() {
        /** */
    }

    loadRoles(criteria: ListCriteria): Observable<Paginated<Role>> {
        return of({
            items: paginate(ROLES_MOCK, criteria.page),
            totalItems: ROLES_MOCK.length
        }).pipe(delay(2500));
    }

    loadRole(roleId: string): Observable<Role> {
        return of(ROLES_MOCK.find(u => u._id === roleId));
    }

    saveRole(role: Role): Observable<Role> {
        return of(role);
    }

    deleteRole(role: Role): Observable<boolean> {
        return;
    }

    loadPrivileges(): Observable<Privilege[]> {
        return of(PRIVILEGES_MOCK).pipe(delay(2500));
    }

    roleFactory(): Observable<Role> {
        return of(EMPTY_ROLE);
    }
}
