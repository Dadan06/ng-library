import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { SortDirection } from 'src/app/shared/types/sort.interface';
import { Client, ClientType } from '../types/client.interface';

export const CLIENT_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    sort: { by: 'name', direction: SortDirection.asc }
};

export const EMPTY_CLIENT_MODEL: Client = {
    _id: undefined,
    name: '',
    address: '',
    email: null,
    remark: null,
    contact: '',
    type: undefined
};

export const CLIENT_BASE_ROUTE = '/root/home/client';

export const CLIENT_API_ROUTE = 'client';

export const CLIENT_TYPE_LABELS = {
    [ClientType.PARTICULAR]: 'PARTICULIER',
    [ClientType.GROUP]: 'GROUPE'
};
