import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Client } from 'src/app/client/types/client.interface';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { ListCriteria } from '../../types/list-criteria.interface';
import { SharedState } from '../reducers/shared.reducers';

export const getSharedState = createFeatureSelector<SharedState>('shared');

export const getAutocompletionLoading = createSelector<SharedState, SharedState, boolean>(
    getSharedState,
    (state: SharedState) => state.loading
);

export const getAutocompletionClients = createSelector<SharedState, SharedState, Client[]>(
    getSharedState,
    (state: SharedState) => state.clients
);

export const getAutocompletionClientCriteria = createSelector<
    SharedState,
    SharedState,
    ListCriteria
>(getSharedState, (state: SharedState) => state.clientCriteria);

export const getAutocompletionSuppliers = createSelector<SharedState, SharedState, Supplier[]>(
    getSharedState,
    (state: SharedState) => state.suppliers
);

export const getAutocompletionSupplierCriteria = createSelector<
    SharedState,
    SharedState,
    ListCriteria
>(getSharedState, (state: SharedState) => state.supplierCriteria);
