import { Action } from '@ngrx/store';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SupplierCriteria } from '../../types/supplier-criteria.interface';
import { Supplier } from '../../types/supplier.interface';

export const enum SupplierActionTypes {
    LOAD_SUPPLIER_MODELS = '[Supplier] Load Suppliers',
    LOAD_SUPPLIER_MODELS_FAIL = '[Supplier] Load Suppliers Fail',
    LOAD_SUPPLIER_MODELS_SUCCESS = '[Supplier] Load Suppliers Success',
    LOAD_SUPPLIER_MODEL = '[Supplier] Load Supplier',
    LOAD_SUPPLIER_MODEL_FAIL = '[Supplier] Load Supplier Fail',
    LOAD_SUPPLIER_MODEL_SUCCESS = '[Supplier] Load Supplier Success',
    DELETE_SUPPLIER_MODEL = '[Supplier] Delete Supplier',
    DELETE_SUPPLIER_MODEL_FAIL = '[Supplier] Delete Supplier Fail',
    DELETE_SUPPLIER_MODEL_SUCCESS = '[Supplier] Delete Supplier Success',
    SAVE_SUPPLIER_MODEL = '[Supplier] Save Supplier',
    SAVE_SUPPLIER_MODEL_FAIL = '[Supplier] Save Supplier Fail',
    SAVE_SUPPLIER_MODEL_SUCCESS = '[Supplier] Save Supplier Success'
}

export class LoadSuppliers implements Action {
    readonly type = SupplierActionTypes.LOAD_SUPPLIER_MODELS;
    constructor(public payload: SupplierCriteria) {}
}

export class LoadSuppliersSuccess implements Action {
    readonly type = SupplierActionTypes.LOAD_SUPPLIER_MODELS_SUCCESS;
    constructor(public payload: Paginated<Supplier>) {}
}

export class LoadSuppliersFail implements Action {
    readonly type = SupplierActionTypes.LOAD_SUPPLIER_MODELS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadSupplier implements Action {
    readonly type = SupplierActionTypes.LOAD_SUPPLIER_MODEL;
    constructor(public payload: string) {}
}

export class LoadSupplierSuccess implements Action {
    readonly type = SupplierActionTypes.LOAD_SUPPLIER_MODEL_SUCCESS;
    constructor(public payload: Supplier) {}
}

export class LoadSupplierFail implements Action {
    readonly type = SupplierActionTypes.LOAD_SUPPLIER_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveSupplier implements Action {
    readonly type = SupplierActionTypes.SAVE_SUPPLIER_MODEL;
    constructor(public payload: Supplier) {}
}

export class SaveSupplierFail implements Action {
    readonly type = SupplierActionTypes.SAVE_SUPPLIER_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveSupplierSuccess implements Action {
    readonly type = SupplierActionTypes.SAVE_SUPPLIER_MODEL_SUCCESS;
    constructor(public payload: Supplier) {}
}

export class DeleteSupplier implements Action {
    readonly type = SupplierActionTypes.DELETE_SUPPLIER_MODEL;
    constructor(public payload: Supplier) {}
}

export class DeleteSupplierFail implements Action {
    readonly type = SupplierActionTypes.DELETE_SUPPLIER_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class DeleteSupplierSuccess implements Action {
    readonly type = SupplierActionTypes.DELETE_SUPPLIER_MODEL_SUCCESS;
}

export type SupplierAction =
    | LoadSuppliers
    | LoadSuppliersSuccess
    | LoadSuppliersFail
    | LoadSupplier
    | LoadSupplierSuccess
    | LoadSupplierFail
    | DeleteSupplier
    | DeleteSupplierFail
    | DeleteSupplierSuccess
    | SaveSupplier
    | SaveSupplierFail
    | SaveSupplierSuccess;
