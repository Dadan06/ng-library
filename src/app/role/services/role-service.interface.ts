import { Observable } from 'rxjs';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { Privilege } from '../types/privilege.interface';
import { Role } from '../types/role.interface';

export interface RoleServiceInterface {
    loadRoles(criteria: ListCriteria): Observable<Paginated<Role>>;
    saveRole(role: Role): Observable<Role>;
    deleteRole(role: Role): Observable<boolean>;
    loadPrivileges(): Observable<Privilege[]>;
    roleFactory(): Observable<Role>;
}
