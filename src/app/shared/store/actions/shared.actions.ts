import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Client } from 'src/app/client/types/client.interface';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { ListCriteria } from '../../types/list-criteria.interface';

export const enum SharedActionTypes {
    LOAD_FOR_AUTOCOMPLETION_FAIL = '[Shared] Load For Autocompletion',
    LOAD_CLIENTS_FOR_AUTOCOMPLETION = '[Shared] Load Clients For Autocompletion',
    LOAD_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS = '[Shared] Load Clients For Autocompletion Success',
    LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION = '[Shared] Load More Clients For Autocompletion',
    LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS = '[Shared] Load More Clients For Autocompletion Success',
    LOAD_SUPPLIERS_FOR_AUTOCOMPLETION = '[Shared] Load Suppliers For Autocompletion',
    LOAD_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS = '[Shared] Load Suppliers For Autocompletion Success',
    LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION = '[Shared] Load More Suppliers For Autocompletion',
    LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS = '[Shared] Load More Suppliers For Autocompletion Success'
}

export class LoadForAutocompletionFail implements Action {
    readonly type = SharedActionTypes.LOAD_FOR_AUTOCOMPLETION_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadClientsForAutocompletion implements Action {
    readonly type = SharedActionTypes.LOAD_CLIENTS_FOR_AUTOCOMPLETION;
    constructor(public payload: ListCriteria) {}
}

export class LoadClientsForAutocompletionSuccess implements Action {
    readonly type = SharedActionTypes.LOAD_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS;
    constructor(public payload: Client[]) {}
}

export class LoadMoreClientsForAutocompletion implements Action {
    readonly type = SharedActionTypes.LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION;
}

export class LoadMoreClientsForAutocompletionSuccess implements Action {
    readonly type = SharedActionTypes.LOAD_MORE_CLIENTS_FOR_AUTOCOMPLETION_SUCCESS;
    constructor(public payload: Client[]) {}
}

export class LoadSuppliersForAutocompletion implements Action {
    readonly type = SharedActionTypes.LOAD_SUPPLIERS_FOR_AUTOCOMPLETION;
    constructor(public payload: ListCriteria) {}
}

export class LoadSuppliersForAutocompletionSuccess implements Action {
    readonly type = SharedActionTypes.LOAD_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS;
    constructor(public payload: Supplier[]) {}
}

export class LoadMoreSuppliersForAutocompletion implements Action {
    readonly type = SharedActionTypes.LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION;
}

export class LoadMoreSuppliersForAutocompletionSuccess implements Action {
    readonly type = SharedActionTypes.LOAD_MORE_SUPPLIERS_FOR_AUTOCOMPLETION_SUCCESS;
    constructor(public payload: Supplier[]) {}
}

export type SharedAction =
    | LoadForAutocompletionFail
    | LoadClientsForAutocompletion
    | LoadClientsForAutocompletionSuccess
    | LoadMoreClientsForAutocompletion
    | LoadMoreClientsForAutocompletionSuccess
    | LoadSuppliersForAutocompletion
    | LoadSuppliersForAutocompletionSuccess
    | LoadMoreSuppliersForAutocompletion
    | LoadMoreSuppliersForAutocompletionSuccess;
