import { Product } from 'src/app/product/types/product.interface';

export interface SaleItem {
    product: Product;
    quantity: number;
    amount: number;
}
