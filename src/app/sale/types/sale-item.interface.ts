import { Product } from 'src/app/product/types/product.interface';
import { Consignation } from './sale.interface';

export interface SaleItem {
    _id: string;
    product: Product;
    quantity: number;
    amount: number;
    consignations: Consignation[];
}
