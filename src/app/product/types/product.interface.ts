import { Supplier } from 'src/app/supplier/types/supplier.interface';

export enum Type {
    DATED = 'DATED',
    UNDATED = 'UNDATED'
}

export interface Product {
    _id: string;
    name: string;
    costPrice: number;
    sellingPrice: number;
    quantity: number;
    type: Type;
    supplier: Supplier;
}
