import { Client } from 'src/app/client/types/client.interface';
import { FilterUpdates } from 'src/app/shared/types/filter-updates.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
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

export interface Consignation {
    selled: number;
    returned: number;
    date: Date;
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
    consignations: Consignation[];
}

export interface PaginatedSale extends Paginated<Sale> {
    filter: FilterUpdates | null;
}

export interface Payment {
    _id: string;
    paymentDate: Date;
    amount: number;
    sale: Sale;
}
