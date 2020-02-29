import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { go } from 'src/app/shared/utils/go.utils';
import { CONSIGNATION_BASE_ROUTE } from '../../constants/sale.constant';
import { SaleState } from '../../store/reducers/sale.reducers';
import { getConsignation, getConsignationEditing } from '../../store/selectors/sale.selectors';
import { Payment } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-form-root',
    templateUrl: './consignation-form-root.component.html',
    styleUrls: ['./consignation-form-root.component.scss']
})
export class ConsignationFormRootComponent implements OnInit {
    consignation$: Observable<Payment>;
    isEditing$: Observable<boolean>;

    constructor(private saleStore: Store<SaleState>) {}

    ngOnInit() {
        this.consignation$ = this.saleStore.pipe(select(getConsignation));
        this.isEditing$ = this.saleStore.pipe(select(getConsignationEditing));
    }

    onEdit(consignation: Payment) {
        go(this.saleStore, [`${CONSIGNATION_BASE_ROUTE}/edit`, consignation._id]);
    }

    onSave(consignation: Payment) {
        /** */
    }

    onCancelEdit(consignation: Payment) {
        go(
            this.saleStore,
            consignation._id
                ? [`${CONSIGNATION_BASE_ROUTE}/detail`, consignation._id]
                : [`${CONSIGNATION_BASE_ROUTE}`]
        );
    }
}
