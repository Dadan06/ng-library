import { SaleType } from '../types/sale.interface';

export const SALE_API_ROUTE = 'sale';

export const SALE_ITEM_API_ROUTE = 'sale-item';

export const SALE_BASE_ROUTE = '/root/admin/sale';

export const SALE_TYPE_LABELS = {
    [SaleType.CONSIGNATION]: 'Consignation',
    [SaleType.DIRECT_SALE]: 'Direct'
};
