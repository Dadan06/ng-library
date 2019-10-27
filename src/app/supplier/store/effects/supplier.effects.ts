import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SUPPLIER_BASE_ROUTE } from '../../constants/supplier.constants';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../types/supplier.interface';
import {
    DeleteSupplier,
    DeleteSupplierFail,
    DeleteSupplierSuccess,
    LoadSupplier,
    LoadSupplierFail,
    LoadSuppliers,
    LoadSuppliersFail,
    LoadSuppliersSuccess,
    LoadSupplierSuccess,
    SaveSupplier,
    SaveSupplierFail,
    SaveSupplierSuccess,
    SupplierActionTypes
} from '../actions/supplier.actions';
import { SupplierState } from '../reducers/supplier.reducers';
import { getSupplierCriteria } from '../selectors/supplier.selectors';

@Injectable()
export class SupplierEffects {
    constructor(
        private action$: Actions,
        private supplierServiceService: SupplierService,
        private store: Store<SupplierState>
    ) {}

    @Effect()
    loadSuppliers$ = this.action$.pipe(
        ofType(SupplierActionTypes.LOAD_SUPPLIER_MODELS),
        switchMap(
            (action: LoadSuppliers): Observable<Paginated<Supplier>> =>
                this.supplierServiceService.loadSuppliers(action.payload)
        ),
        map((response: Paginated<Supplier>) => new LoadSuppliersSuccess(response)),
        catchError(error => of(new LoadSuppliersFail(error)))
    );

    @Effect()
    loadSupplier$ = this.action$.pipe(
        ofType(SupplierActionTypes.LOAD_SUPPLIER_MODEL),
        switchMap(
            (action: LoadSupplier): Observable<Supplier> =>
                this.supplierServiceService.loadSupplier(action.payload)
        ),
        map((response: Supplier) => new LoadSupplierSuccess(response)),
        catchError(error => of(new LoadSupplierFail(error)))
    );

    @Effect()
    saveSupplier$ = this.action$.pipe(
        ofType(SupplierActionTypes.SAVE_SUPPLIER_MODEL),
        switchMap(
            (action: SaveSupplier): Observable<Supplier> =>
                this.supplierServiceService.saveSupplier(action.payload)
        ),
        map((response: Supplier) => new SaveSupplierSuccess(response)),
        catchError(error => of(new SaveSupplierFail(error)))
    );

    @Effect()
    saveSupplierSuccess$ = this.action$.pipe(
        ofType(SupplierActionTypes.SAVE_SUPPLIER_MODEL_SUCCESS),
        map((action: SaveSupplierSuccess) => action.payload),
        withLatestFrom(this.store.pipe(select(getSupplierCriteria))),
        mergeMap(([supplier, criteria]) => [
            new LoadSuppliers(criteria),
            new Go({
                path: [`${SUPPLIER_BASE_ROUTE}/detail/${supplier._id}`]
            })
        ])
    );

    @Effect()
    deleteSupplier$ = this.action$.pipe(
        ofType(SupplierActionTypes.DELETE_SUPPLIER_MODEL),
        switchMap(
            (action: DeleteSupplier): Observable<void> =>
                this.supplierServiceService.deleteSupplier(action.payload)
        ),
        mergeMap(() => [
            new DeleteSupplierSuccess(),
            new Go({
                path: [`${SUPPLIER_BASE_ROUTE}`]
            })
        ]),
        catchError(error => of(new DeleteSupplierFail(error)))
    );

    @Effect()
    deleteSupplierSuccess$ = this.action$.pipe(
        ofType(SupplierActionTypes.DELETE_SUPPLIER_MODEL_SUCCESS),
        withLatestFrom(this.store.pipe(select(getSupplierCriteria))),
        map(([action, criteria]) => new LoadSuppliers(criteria))
    );
}
