import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';

export interface ProductCriteria {
    page: Page;
    search: string;
    sort: Sort;
}
