import { Page } from 'src/app/shared/types/page.interface';
import { SaleFilter } from './sale-filter.interface';

export interface SaleCriteria {
    page: Page;
    search: string;
    filter: SaleFilter;
}
