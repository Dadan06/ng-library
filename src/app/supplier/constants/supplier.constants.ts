import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { SortDirection } from 'src/app/shared/types/sort.interface';
import { Supplier } from '../types/supplier.interface';

export const SUPPLIER_DEFAULT_CRITERIA: ListCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    sort: { by: 'name', direction: SortDirection.asc }
};

export const EMPTY_SUPPLIER_MODEL: Supplier = {
    _id: undefined,
    name: '',
    address: '',
    contact: '',
    nif: '',
    stat: '',
    cin: ''
};

export const SUPPLIER_API_ROUTE = 'supplier';

export const SUPPLIER_BASE_ROUTE = '/root/home/supplier';
