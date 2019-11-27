import { Component } from '@angular/core';
import {
    SALE_DEFAULT_FILTERS,
    SALE_FILTER_CATEGORY_LABELS,
    SALE_FILTER_ITEM_LABELS
} from '../../constants/sale-monitoring.constant';
import { SaleCriteria } from '../../types/sale-criteria.interface';

@Component({
    selector: 'app-sale-root',
    templateUrl: './sale-root.component.html',
    styleUrls: ['./sale-root.component.scss']
})
export class SaleRootComponent {
    saleFilterCategoryLabels = SALE_FILTER_CATEGORY_LABELS;
    saleFilterItemLabels = SALE_FILTER_ITEM_LABELS;
    saleDefaultFilters = SALE_DEFAULT_FILTERS;
    saleCriteria: SaleCriteria;
}
