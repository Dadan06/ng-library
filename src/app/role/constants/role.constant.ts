import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { SortDirection } from 'src/app/shared/types/sort.interface';
import { Role } from '../types/role.interface';

export const ROLE_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    sort: { by: 'name', direction: SortDirection.asc }
};

export const EMPTY_ROLE: Role = {
    _id: '',
    name: '',
    privileges: []
};

export const ROLE_ROUTE = 'role';

export const ROLE_BASE_ROUTE = '/root/access-management/role';
