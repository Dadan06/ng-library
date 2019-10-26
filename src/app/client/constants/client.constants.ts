import { ClientCriteria } from '../types/client-criteria.interface';
import { Client } from '../types/client.interface';

export const CLIENT_DEFAULT_CRITERIA: ClientCriteria = {
    page: { page: 1, pageSize: 15 },
    search: ''
};

export const EMPTY_CLIENT_MODEL: Client = {
    _id: null,
    name: null,
    address: null,
    contact: null,
    type: undefined
};

export const CLIENT_BASE_ROUTE = '/root/home/client';

export const CLIENT_API_ROUTE = 'client';
