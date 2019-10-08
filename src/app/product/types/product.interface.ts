import { Supplier } from 'src/app/supplier/types/supplier.interface';

export interface Product {
    _id: string;
    name: string;
    costPrice: number;
    sellingPrice: number;
    supplier: Supplier;
}
