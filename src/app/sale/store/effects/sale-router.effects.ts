import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { CONSIGNATION_BASE_ROUTE, SALE_BASE_ROUTE } from '../../constants/sale.constant';
import { LoadConsignationItem, LoadConsignations, LoadProducts } from '../actions/sale.actions';
import { SaleState } from '../reducers/sale.reducers';
import { getConsignationCriteria, getProductCriteria } from '../selectors/sale.selectors';

@Injectable()
export class SaleRouterEffects {
    constructor(private action$: Actions, private store: Store<SaleState>) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    saleRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.endsWith(`${SALE_BASE_ROUTE}`)),
        withLatestFrom(this.store.pipe(select(getProductCriteria))),
        map(([routerState, productCriteria]) => new LoadProducts(productCriteria))
    );

    @Effect()
    consignationsRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes('consignation')),
        withLatestFrom(this.store.pipe(select(getConsignationCriteria))),
        map(([routerState, criteria]) => new LoadConsignations(criteria))
    );

    @Effect()
    consignationFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${CONSIGNATION_BASE_ROUTE}/detail`) ||
                state.url.includes(`${CONSIGNATION_BASE_ROUTE}/edit`)
        ),
        map(routerState => new LoadConsignationItem(routerState.params.saleItemId))
    );
}
