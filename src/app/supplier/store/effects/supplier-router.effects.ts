import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../types/supplier.interface';
import { LoadSupplier, LoadSuppliers, LoadSupplierSuccess } from '../actions/supplier.actions';
import { SupplierState } from '../reducers/supplier.reducers';
import { getSupplierCriteria, getSuppliers } from '../selectors/supplier.selectors';

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
        filter(state => state.url.includes('master-detail')),
        withLatestFrom(
            this.store.pipe(select(getSuppliers)),
            this.store.pipe(select(getSupplierCriteria))
        ),
        filter(([routerState, supplierModels]) => supplierModels.length === 0),
        map(
            ([routerState, supplierModels, supplierModelCriteria]) =>
                new LoadSuppliers(supplierModelCriteria)
        )
    );

    @Effect()
    supplierFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes('master-detail/detail') ||
                state.url.includes('master-detail/edit')
        ),
        map(routerState => new LoadSupplier(routerState.params.supplierModelId))
    );

    @Effect()
    supplierNewRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes('master-detail/new')),
        switchMap(() =>
            this.supplierService
                .supplierFactory()
                .pipe(map((response: Supplier) => new LoadSupplierSuccess(response)))
        )
    );
}
