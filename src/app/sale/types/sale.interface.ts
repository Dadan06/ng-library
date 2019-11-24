import { Client } from 'src/app/client/types/client.interface';
import { User } from 'src/app/user/types/user.interface';
import { SaleItem } from './sale-item.interface';

export enum SaleStatus {
    ORDERED = 'ORDERED',
    IN_PROGRESS = 'IN_PROGRESS',
    CANCELED = 'CANCELED',
    TERMINATED = 'TERMINATED'
}

export enum SaleType {
    DIRECT_SALE = 'DIRECT_SALE',
    CONSIGNATION = 'CONSIGNATION'
}

export interface Sale {
    _id: string;
    no: number;
    saleType: SaleType;
    saleDate: Date;
    saleItems: SaleItem[];
    amount: number;
    discount: number;
    saleStatus: SaleStatus;
    seller: User;
    client: Client;
}
