import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/sale/types/sale.interface';
import { FilterUpdates } from 'src/app/shared/types/filter-updates.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { PeriodFilter } from 'src/app/shared/types/period-filter.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { go } from 'src/app/shared/utils/go.utils';
import {
    SALE_DEFAULT_FILTERS,
    SALE_FILTER_CATEGORY_LABELS,
    SALE_FILTER_ITEM_LABELS,
    SALE_MONITORING_BASE_ROUTE
} from '../../constants/sale-monitoring.constant';
import { LoadSales } from '../../store/actions/sale-monitoring.actions';
import { SaleMonitoringState } from '../../store/reducers/sale-monitoring.reducers';
import {
    getSale,
    getSaleCriteria,
    getSaleFilterUpdates,
    getSales,
    getSalesLoading,
    getSalesTotalItem
} from '../../store/selectors/sale-monitoring.selectors';
import { SaleCriteria } from '../../types/sale-criteria.interface';
import { SaleListBoxFilter } from '../../types/sale-list-box-filter.interface';

@Component({
    selector: 'app-sale-root',
    templateUrl: './sale-root.component.html',
    styleUrls: ['./sale-root.component.scss']
})
export class SaleRootComponent implements OnInit {
    sales$: Observable<Sale[]>;
    sale$: Observable<Sale>;
    salesLoading$: Observable<boolean>;
    totalItems$: Observable<number>;
    saleFilterUpdates$: Observable<FilterUpdates>;

    saleFilterCategoryLabels = SALE_FILTER_CATEGORY_LABELS;
    saleFilterItemLabels = SALE_FILTER_ITEM_LABELS;
    saleDefaultFilters = SALE_DEFAULT_FILTERS;
    saleCriteria: SaleCriteria;
    periodFilter: PeriodFilter;

    constructor(private store: Store<SaleMonitoringState>) {}

    ngOnInit(): void {
        this.sales$ = this.store.pipe(select(getSales));
        this.salesLoading$ = this.store.pipe(select(getSalesLoading));
        this.totalItems$ = this.store.pipe(select(getSalesTotalItem));
        this.saleFilterUpdates$ = this.store.pipe(select(getSaleFilterUpdates));
        this.sale$ = this.store.pipe(select(getSale));
        this.store
            .pipe(select(getSaleCriteria))
            .subscribe(criteria => (this.saleCriteria = criteria));
        const { from, to } = this.saleCriteria.filter;
        this.periodFilter = { from, to };
    }

    onSort(sort: Sort) {
        this.saleCriteria.sort = sort;
        this.refreshList();
    }

    onFilter(filter: SaleListBoxFilter | PeriodFilter) {
        this.saleCriteria = {
            ...this.saleCriteria,
            filter: { ...this.saleCriteria.filter, ...filter }
        };
        this.refreshList();
    }

    onPaginate(page: Page) {
        this.saleCriteria.page = page;
        this.refreshList();
    }

    onSearch(search: string) {
        this.saleCriteria.search = search;
        this.refreshList();
    }

    onViewDetails(sale: Sale) {
        go(this.store, [`${SALE_MONITORING_BASE_ROUTE}/detail`, sale._id]);
    }

    private refreshList() {
        this.store.dispatch(new LoadSales({ ...this.saleCriteria }));
    }
}
