import { Client } from 'src/app/client/types/client.interface';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { ListCriteria } from '../../types/list-criteria.interface';
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
    SharedAction,
    SharedActionTypes
} from '../actions/shared.actions';

export interface SharedState {
    loading: boolean;
    clients: Client[];
    clientCriteria: ListCriteria;
    suppliers: Supplier[];
    supplierCriteria: ListCriteria;
}

const initialState: SharedState = {
    loading: false,
    clients: [],
    clientCriteria: undefined,
    suppliers: [],
    supplierCriteria: undefined
};

const loadAutocompletionFail = (
    state: SharedState,
    action: LoadForAutocompletionFail
): SharedState => ({
    ...state,
    loading: false
});

const loadClientsForAutocompletion = (
    state: SharedState,
    action: LoadClientsForAutocompletion
): SharedState => ({
    ...state,
    loading: true,
    clientCriteria: action.payload
});

const loadClientsForAutocompletionSuccess = (
    state: SharedState,
    action: LoadClientsForAutocompletionSuccess
): SharedState => ({
    ...state,
    loading: false,
    clients: action.payload
});

const loadMoreClientsForAutocompletion = (
    state: SharedState,
    action: LoadMoreClientsForAutocompletion
): SharedState => ({
    ...state,
    clientCriteria: {
        ...state.clientCriteria,
        page: { ...state.clientCriteria.page, page: state.clientCriteria.page.page + 1 }
    }
});

const loadMoreClientsForAutocompletionSuccess = (
    state: SharedState,
    action: LoadMoreClientsForAutocompletionSuccess
): SharedState => ({
    ...state,
    clients: [...state.clients, ...action.payload]
});

const loadSuppliersForAutocompletion = (
    state: SharedState,
    action: LoadSuppliersForAutocompletion
): SharedState => ({
    ...state,
    loading: true,
    clientCriteria: action.payload
});

const loadSuppliersForAutocompletionSuccess = (
    state: SharedState,
    action: LoadSuppliersForAutocompletionSuccess
): SharedState => ({
    ...state,
    loading: false,
    suppliers: action.payload
});

const loadMoreSuppliersForAutocompletion = (
    state: SharedState,
    action: LoadMoreSuppliersForAutocompletion
): SharedState => ({
    ...state,
    supplierCriteria: {
        ...state.clientCriteria,
        page: { ...state.clientCriteria.page, page: state.clientCriteria.page.page + 1 }
    }
});

const loadMoreSuppliersForAutocompletionSuccess = (
    state: SharedState,
    action: LoadMoreSuppliersForAutocompletionSuccess
): SharedState => ({
    ...state,
    suppliers: [...state.clients, ...action.payload]
});

// tslint:disable-next-line: cyclomatic-complexity
export function sharedReducer(
    state: SharedState = initialState,
    action: SharedAction
): SharedState {
    switch (action.type) {
        case SharedActionTypes.LOAD_FOR_AUTOCOMPLETION_FAIL:
            return loadAutocompletionFail(state, action);
        case SharedActionTypes.LOAD_CLIENTS_FOR_AUTOCOMPLETION:
            return loadClientsForAutocompletion(state, action);
        case SharedActionTypes.LOAD_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS:
            return loadClientsForAutocompletionSuccess(state, action);
        case SharedActionTypes.LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION:
            return loadMoreClientsForAutocompletion(state, action);
        case SharedActionTypes.LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS:
            return loadMoreClientsForAutocompletionSuccess(state, action);
        case SharedActionTypes.LOAD_SUPPLIERS_FOR_AUTOCOMPLETION:
            return loadSuppliersForAutocompletion(state, action);
        case SharedActionTypes.LOAD_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS:
            return loadSuppliersForAutocompletionSuccess(state, action);
        case SharedActionTypes.LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION:
            return loadMoreSuppliersForAutocompletion(state, action);
        case SharedActionTypes.LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS:
            return loadMoreSuppliersForAutocompletionSuccess(state, action);
        default:
            return state;
    }
}
