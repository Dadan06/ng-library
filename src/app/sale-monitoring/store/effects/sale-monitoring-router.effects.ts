import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { SALE_MONITORING_BASE_ROUTE } from '../../constants/sale-monitoring.constant';
import { LoadSales } from '../actions/sale-monitoring.actions';
import { SaleMonitoringState } from '../reducers/sale-monitoring.reducers';
import { getSaleCriteria } from '../selectors/sale-monitoring.selectors';

@Injectable()
export class SaleMonitoringRouterEffects {
    constructor(private actions$: Actions, private store: Store<SaleMonitoringState>) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    salesRoute$ = this.actions$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        withLatestFrom(this.store.pipe(select(getSaleCriteria))),
        filter(([routerState, criteria]) =>
            routerState.url.endsWith(`${SALE_MONITORING_BASE_ROUTE}`)
        ),
        map(([routerState, criteria]) => new LoadSales(criteria))
    );
}
