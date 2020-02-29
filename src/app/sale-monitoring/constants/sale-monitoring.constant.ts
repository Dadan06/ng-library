import { CLIENT_TYPE_LABELS } from 'src/app/client/constants/client.constants';
import { SALE_TYPE_LABELS } from 'src/app/sale/constants/sale.constant';
import { SortDirection } from 'src/app/shared/types/sort.interface';
import { SaleCriteria } from '../types/sale-criteria.interface';

export const SALE_DEFAULT_CRITERIA: SaleCriteria = {
    page: { page: 1, pageSize: 15 },
    search: '',
    sort: { by: 'paymentDate', direction: SortDirection.asc },
    filter: {
        from: ((d = new Date()) => `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()} 00:00`)(),
        to: ((d = new Date()) => `${d.getMonth() + 1}-${d.getDate()}-${d.getFullYear()} 23:59`)(),
        sellers: null,
        clients: null,
        types: null,
        clientTypes: null
    }
};

export const SALE_FILTER_CATEGORY_LABELS: Record<string, string> = {
    sellers: 'Vendeurs',
    types: 'Types vente',
    clients: 'Clients',
    clientTypes: 'Types client'
};

export const SALE_FILTER_ITEM_LABELS: Record<string, Object> = {
    types: { ...SALE_TYPE_LABELS },
    clientTypes: { ...CLIENT_TYPE_LABELS }
};

export const SALE_DEFAULT_FILTERS: string[] = [];

export const SALE_MONITORING_API_ROUTE = 'sale-monitoring';

export const SALE_MONITORING_BASE_ROUTE = '/root/admin/sale-monitoring';
