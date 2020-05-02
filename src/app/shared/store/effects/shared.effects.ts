import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, delay, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ClientService } from 'src/app/client/services/client.service';
import { Client } from 'src/app/client/types/client.interface';
import { SupplierService } from 'src/app/supplier/services/supplier.service';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { ListCriteria } from '../../types/list-criteria.interface';
import { Paginated } from '../../types/paginated.interface';
import {
    LoadClientsForAutocompletion,
    LoadClientsForAutocompletionSuccess,
    LoadForAutocompletionFail,
    LoadMoreClientsForAutocompletion,
    LoadMoreClientsForAutocompletionSuccess,
    LoadMoreSuppliersForAutocompletion,
    LoadMoreSuppliersForAutocompletionSuccess,
    LoadSuppliersForAutocompletion,
    LoadSuppliersForAutocompletionSuccess,
    SharedActionTypes
} from '../actions/shared.actions';
import { SharedState } from '../reducers/shared.reducers';
import {
    getAutocompletionClientCriteria,
    getAutocompletionSupplierCriteria
} from '../selectors/shared.selectors';

@Injectable()
export class SharedEffects {
    constructor(
        private action$: Actions,
        private store: Store<SharedState>,
        private clientService: ClientService,
        private supplierService: SupplierService
    ) {}

    @Effect()
    loadClientsForAutocompletion$ = this.action$.pipe(
        ofType(SharedActionTypes.LOAD_CLIENTS_FOR_AUTOCOMPLETION),
        switchMap((action: LoadClientsForAutocompletion) =>
            this.clientService.loadClients(action.payload).pipe(
                map(
                    (response: Paginated<Client>) =>
                        new LoadClientsForAutocompletionSuccess(response.items)
                ),
                catchError(error => of(new LoadForAutocompletionFail(error)))
            )
        )
    );

    @Effect()
    loadMoreClientsForAutocompletion$ = this.action$.pipe(
        ofType(SharedActionTypes.LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS),
        delay(200),
        withLatestFrom<LoadMoreClientsForAutocompletion, ListCriteria>(
            this.store.pipe(select(getAutocompletionClientCriteria))
        ),
        switchMap(([action, criteria]) =>
            this.clientService.loadClients(criteria).pipe(
                map(
                    (response: Paginated<Client>) =>
                        new LoadMoreClientsForAutocompletionSuccess(response.items)
                ),
                catchError(error => of(new LoadForAutocompletionFail(error)))
            )
        )
    );

    @Effect()
    loadSuppliersForAutocompletion$ = this.action$.pipe(
        ofType(SharedActionTypes.LOAD_SUPPLIERS_FOR_AUTOCOMPLETION),
        switchMap((action: LoadSuppliersForAutocompletion) =>
            this.supplierService.loadSuppliers(action.payload).pipe(
                map(
                    (response: Paginated<Supplier>) =>
                        new LoadSuppliersForAutocompletionSuccess(response.items)
                ),
                catchError(error => of(new LoadForAutocompletionFail(error)))
            )
        )
    );

    @Effect()
    loadMoreSuppliersForAutocompletion$ = this.action$.pipe(
        ofType(SharedActionTypes.LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS),
        delay(200),
        withLatestFrom<LoadMoreSuppliersForAutocompletion, ListCriteria>(
            this.store.pipe(select(getAutocompletionSupplierCriteria))
        ),
        switchMap(([action, criteria]) =>
            this.supplierService.loadSuppliers(criteria).pipe(
                map(
                    (response: Paginated<Supplier>) =>
                        new LoadMoreSuppliersForAutocompletionSuccess(response.items)
                ),
                catchError(error => of(new LoadForAutocompletionFail(error)))
            )
        )
    );
}
