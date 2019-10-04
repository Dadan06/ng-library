import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { User } from '../types/user.interface';

export const USER_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: ''
};

export const EMPTY_USER: User = {
    _id: '',
    firstname: '',
    lastname: '',
    login: '',
    role: undefined
};

export const USER_ROUTE = 'user';

export const USER_BASE_ROUTE = '/root/access-management/user';
