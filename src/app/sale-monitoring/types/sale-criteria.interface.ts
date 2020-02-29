import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { SaleFilter } from './sale-filter.interface';

export interface SaleCriteria extends ListCriteria {
    filter: SaleFilter;
}
