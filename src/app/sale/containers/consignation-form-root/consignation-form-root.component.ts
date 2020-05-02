import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SaveConsignation } from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import { getSaleItem } from '../../store/selectors/sale.selectors';
import { SaleItem } from '../../types/sale-item.interface';

@Component({
    selector: 'app-consignation-form-root',
    templateUrl: './consignation-form-root.component.html',
    styleUrls: ['./consignation-form-root.component.scss']
})
export class ConsignationFormRootComponent implements OnInit {
    saleItem$: Observable<SaleItem>;

    constructor(private saleStore: Store<SaleState>) {}

    ngOnInit() {
        this.saleItem$ = this.saleStore.pipe(select(getSaleItem));
    }

    onSave(saleItem: SaleItem) {
        this.saleStore.dispatch(new SaveConsignation(saleItem));
    }
}
