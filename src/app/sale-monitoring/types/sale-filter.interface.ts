import { PeriodFilter } from 'src/app/shared/types/period-filter.interface';

export interface SaleFilter extends PeriodFilter {
    sellers: string[] | null;
    types: string[] | null;
}
