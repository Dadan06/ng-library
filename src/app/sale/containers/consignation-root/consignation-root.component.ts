import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { SALE_DEFAULT_CRITERIA } from 'src/app/sale-monitoring/constants/sale-monitoring.constant';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { CONSIGNATION_BASE_ROUTE } from '../../constants/sale.constant';
import { LoadConsignations } from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import {
    getConsignations,
    getConsignationSaved,
    getConsignationsLoading,
    getConsignationsTotalItems,
    getSaleItem
} from '../../store/selectors/sale.selectors';
import { SaleItem } from '../../types/sale-item.interface';
import { Payment } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-root',
    templateUrl: './consignation-root.component.html',
    styleUrls: ['./consignation-root.component.scss']
})
export class ConsignationRootComponent implements OnInit {
    consignationsLoading$: Observable<boolean>;
    consignations$: Observable<Payment[]>;
    totalItems$: Observable<number>;
    consignationCriteria: ListCriteria = cloneDeep(SALE_DEFAULT_CRITERIA);
    currentSaleItem$: Observable<SaleItem>;

    @ViewChild('consignationSaved') consignationSaved: ModalComponent;

    constructor(private saleStore: Store<SaleState>) {}

    ngOnInit() {
        this.consignationsLoading$ = this.saleStore.pipe(select(getConsignationsLoading));
        this.consignations$ = this.saleStore.pipe(select(getConsignations));
        this.totalItems$ = this.saleStore.pipe(select(getConsignationsTotalItems));
        this.currentSaleItem$ = this.saleStore.pipe(select(getSaleItem));
        this.subscribeModals();
    }

    onSort(sort: Sort) {
        this.consignationCriteria.sort = sort;
        this.refreshList();
    }

    onSearch(search: string) {
        this.consignationCriteria.search = search;
        this.refreshList();
    }

    onPaginate(page: Page) {
        this.consignationCriteria.page = page;
        this.refreshList();
    }

    onViewDetail(saleItem: SaleItem) {
        go(this.saleStore, [`${CONSIGNATION_BASE_ROUTE}/detail`, saleItem._id]);
    }

    onEdit(saleItem: SaleItem) {
        go(this.saleStore, [`${CONSIGNATION_BASE_ROUTE}/edit`, saleItem._id]);
    }

    private refreshList() {
        this.saleStore.dispatch(new LoadConsignations({ ...this.consignationCriteria }));
    }

    private subscribeModals() {
        subscribeModal(this.saleStore, getConsignationSaved, true, this.consignationSaved);
    }
}
