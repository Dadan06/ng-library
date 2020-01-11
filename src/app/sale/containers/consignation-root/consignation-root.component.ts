import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/types/page.interface';
import { SaleState } from '../../store/reducers/sale.reducers';
import { getConsignations, getConsignationsLoading } from '../../store/selectors/sale.selectors';
import { Sale } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-root',
    templateUrl: './consignation-root.component.html',
    styleUrls: ['./consignation-root.component.scss']
})
export class ConsignationRootComponent implements OnInit {
    consignationsLoading$: Observable<boolean>;
    consignation$: Observable<Sale[]>;

    constructor(private saleStore: Store<SaleState>) {
        this.consignationsLoading$ = this.saleStore.pipe(select(getConsignationsLoading));
        this.consignation$ = this.saleStore.pipe(select(getConsignations));
    }

    ngOnInit() {
        /** */
    }

    onSearch(search: string) {
        /** */
    }

    onPaginate(page: Page) {
        /** */
    }
}
