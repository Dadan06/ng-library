import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { PaginatedSale } from 'src/app/sale/types/sale.interface';
import { SaleMonitoringService } from '../../services/sale-monitoring.service';
import {
    LoadSales,
    LoadSalesFail,
    LoadSalesSuccess,
    SaleMonitoringActionTypes
} from '../actions/sale-monitoring.actions';

@Injectable()
export class SaleMonitoringEffects {
    constructor(private action$: Actions, private saleMonitoringService: SaleMonitoringService) {}

    @Effect()
    loadSales$ = this.action$.pipe(
        ofType(SaleMonitoringActionTypes.LOAD_SALES),
        switchMap((action: LoadSales) =>
            this.saleMonitoringService.loadSales(action.payload).pipe(
                map((response: PaginatedSale) => new LoadSalesSuccess(response)),
                catchError(error => of(new LoadSalesFail(error)))
            )
        )
    );
}
