import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { SortDirection } from 'src/app/shared/types/sort.interface';
import { User } from '../types/user.interface';

export const USER_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    sort: { by: 'lastname', direction: SortDirection.asc }
};

export const EMPTY_USER: User = {
    _id: undefined,
    firstname: '',
    lastname: '',
    login: '',
    role: undefined
};

export const USER_ROUTE = 'user';

export const USER_BASE_ROUTE = '/root/access-management/user';
