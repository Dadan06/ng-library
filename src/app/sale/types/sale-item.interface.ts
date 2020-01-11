import { Product } from 'src/app/product/types/product.interface';
import { Incrementation } from 'src/app/shared/types/incrementation.interface';

export enum SaleItemStatus {
    ORDERED = 'ORDERED',
    DELETED = 'DELETED'
}

export interface ChangeQtyPayload {
    saleItem: SaleItem;
    incrementation: Incrementation;
}

export interface SaleItem {
    _id: string;
    product: Product;
    quantity: number;
    amount?: number;
    status: SaleItemStatus;
}
