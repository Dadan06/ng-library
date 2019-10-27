import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { SUPPLIER_API_ROUTE } from '../../constants/supplier.constants';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../types/supplier.interface';
import { LoadSupplier, LoadSuppliers, LoadSupplierSuccess } from '../actions/supplier.actions';
import { SupplierState } from '../reducers/supplier.reducers';
import { getSupplierCriteria } from '../selectors/supplier.selectors';

@Injectable()
export class SupplierRouterEffects {
    constructor(
        private action$: Actions,
        private store: Store<SupplierState>,
        private supplierService: SupplierService
    ) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    supplierRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${SUPPLIER_API_ROUTE}`)),
        withLatestFrom(this.store.pipe(select(getSupplierCriteria))),
        map(([routerState, supplierCriteria]) => new LoadSuppliers(supplierCriteria))
    );

    @Effect()
    supplierFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${SUPPLIER_API_ROUTE}/detail`) ||
                state.url.includes(`${SUPPLIER_API_ROUTE}/edit`)
        ),
        map(routerState => new LoadSupplier(routerState.params.supplierId))
    );

    @Effect()
    supplierNewRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${SUPPLIER_API_ROUTE}/new`)),
        switchMap(() =>
            this.supplierService
                .supplierFactory()
                .pipe(map((response: Supplier) => new LoadSupplierSuccess(response)))
        )
    );
}
