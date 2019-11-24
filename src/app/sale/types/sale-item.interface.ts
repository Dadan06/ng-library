import { Product } from 'src/app/product/types/product.interface';

export enum SaleItemStatus {
    ORDERED = 'ORDERED',
    DELETED = 'DELETED'
}

export interface QuantityChangingData {
    previousValue: number;
    saleItem: SaleItem;
}

export interface SaleItem {
    _id: string;
    product: Product;
    quantity: number;
    amount?: number;
    status: SaleItemStatus;
}
