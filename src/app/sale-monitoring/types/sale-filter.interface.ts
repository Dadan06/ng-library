import { PeriodFilter } from 'src/app/shared/types/period-filter.interface';

export interface SaleFilter extends PeriodFilter {
    clients: string[] | null;
    sellers: string[] | null;
    types: string[] | null;
    clientTypes: string[] | null;
}
