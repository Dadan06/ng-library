import { SupplierCriteria } from '../types/supplier-criteria.interface';
import { Supplier } from '../types/supplier.interface';

export const SUPPLIER_DEFAULT_CRITERIA: SupplierCriteria = {
    page: { page: 1, pageSize: 15 },
    search: ''
};

export const EMPTY_SUPPLIER_MODEL: Supplier = {
    _id: null,
    name: null,
    address: null,
    contact: null
};

export const SUPPLIER_API_ROUTE = 'supplier';

export const SUPPLIER_BASE_ROUTE = '/root/home/supplier';
