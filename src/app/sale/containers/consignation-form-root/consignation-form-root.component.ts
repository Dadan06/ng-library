import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { go } from 'src/app/shared/utils/go.utils';
import { CONSIGNATION_BASE_ROUTE } from '../../constants/sale.constant';
import { SaveConsignation } from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import { getConsignationEditing, getSaleItem } from '../../store/selectors/sale.selectors';
import { SaleItem } from '../../types/sale-item.interface';

@Component({
    selector: 'app-consignation-form-root',
    templateUrl: './consignation-form-root.component.html',
    styleUrls: ['./consignation-form-root.component.scss']
})
export class ConsignationFormRootComponent implements OnInit {
    saleItem$: Observable<SaleItem>;
    isEditing$: Observable<boolean>;

    constructor(private saleStore: Store<SaleState>) {}

    ngOnInit() {
        this.saleItem$ = this.saleStore.pipe(select(getSaleItem));
        this.isEditing$ = this.saleStore.pipe(select(getConsignationEditing));
    }

    onEdit(saleItem: SaleItem) {
        go(this.saleStore, [`${CONSIGNATION_BASE_ROUTE}/edit`, saleItem._id]);
    }

    onSave(saleItem: SaleItem) {
        this.saleStore.dispatch(new SaveConsignation(saleItem));
    }

    onCancelEdit(saleItem: SaleItem) {
        go(
            this.saleStore,
            saleItem._id
                ? [`${CONSIGNATION_BASE_ROUTE}/detail`, saleItem._id]
                : [`${CONSIGNATION_BASE_ROUTE}`]
        );
    }
}
