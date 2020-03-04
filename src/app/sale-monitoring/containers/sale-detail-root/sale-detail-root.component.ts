import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Sale } from 'src/app/sale/types/sale.interface';
import { SaleMonitoringState } from '../../store/reducers/sale-monitoring.reducers';
import { getSale } from '../../store/selectors/sale-monitoring.selectors';

@Component({
    selector: 'app-sale-detail-root',
    templateUrl: './sale-detail-root.component.html',
    styleUrls: ['./sale-detail-root.component.scss']
})
export class SaleDetailRootComponent implements OnInit {
    sale$: Observable<Sale>;

    constructor(private store: Store<SaleMonitoringState>) {}

    ngOnInit() {
        this.sale$ = this.store.pipe(select(getSale));
    }
}
