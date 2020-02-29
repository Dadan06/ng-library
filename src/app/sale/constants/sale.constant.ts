import { SaleItem } from '../types/sale-item.interface';
import { Sale, SaleStatus, SaleType } from '../types/sale.interface';

export const SALE_API_ROUTE = 'sale';

export const PAYMENT_API_ROUTE = 'payment';

export const SALE_ITEM_API_ROUTE = 'sale-item';

export const SALE_BASE_ROUTE = '/root/admin/sale';

export const CONSIGNATION_BASE_ROUTE = `${SALE_BASE_ROUTE}/consignation`;

export const SALE_TYPE_LABELS = {
    [SaleType.CONSIGNATION]: 'Consignation',
    [SaleType.DIRECT_SALE]: 'Direct'
};

export const EMPTY_SALE: Sale = {
    _id: undefined,
    no: 0,
    saleType: SaleType.DIRECT_SALE,
    saleDate: new Date(),
    saleItems: [],
    amount: 0,
    discount: 0,
    saleStatus: SaleStatus.IN_PROGRESS,
    seller: null,
    client: null,
    consignations: []
};

export const EMPTY_SALE_ITEM: SaleItem = {
    product: undefined,
    quantity: 0,
    amount: 0
};
