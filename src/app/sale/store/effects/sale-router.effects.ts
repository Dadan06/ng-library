import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { LoadClients } from 'src/app/shared/store/actions/shared.actions';
import { SALE_BASE_ROUTE } from '../../constants/sale.constant';
import { LoadConsignations, LoadProducts } from '../actions/sale.actions';
import { SaleState } from '../reducers/sale.reducers';
import { getProductCriteria } from '../selectors/sale.selectors';

@Injectable()
export class SaleRouterEffects {
    constructor(private action$: Actions, private store: Store<SaleState>) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    saleRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url === SALE_BASE_ROUTE),
        withLatestFrom(this.store.pipe(select(getProductCriteria))),
        mergeMap(([routerState, productCriteria]) => [
            new LoadClients(),
            new LoadProducts(productCriteria)
        ])
    );

    @Effect()
    consignationRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes('consignation')),
        map(() => new LoadConsignations())
    );
}
