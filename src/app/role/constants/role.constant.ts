import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Role } from '../types/role.interface';

export const ROLE_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: ''
};

export const EMPTY_ROLE: Role = {
    _id: '',
    name: '',
    privileges: []
};

export const ROLE_ROUTE = 'role';

export const ROLE_BASE_ROUTE = '/root/access-management/role';
