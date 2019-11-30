import { SaleCriteria } from '../types/sale-criteria.interface';

export const SALE_DEFAULT_CRITERIA: SaleCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    filter: {
        from: ((d = new Date()) => `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()} 00:00`)(),
        to: ((d = new Date()) => `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()} 23:59`)(),
        sellers: null,
        clients: null,
        types: null
    }
};

export const SALE_FILTER_CATEGORY_LABELS: Record<string, string> = {
    sellers: 'Vendeurs',
    types: 'Types de vente',
    clients: 'clients'
};

export const SALE_FILTER_ITEM_LABELS: Record<string, Object> = {};

export const SALE_DEFAULT_FILTERS: string[] = [];

export const SALE_MONITORING_API_ROUTE = 'sale-monitoring';

export const SALE_MONITORING_BASE_ROUTE = '/root/admin/sale-monitoring';
