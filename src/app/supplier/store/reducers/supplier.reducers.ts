import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SUPPLIER_DEFAULT_CRITERIA } from '../../constants/supplierl.constants';
import { SupplierCriteria } from '../../types/supplier-criteria.interface';
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
    SupplierAction,
    SupplierActionTypes
} from '../actions/supplier.actions';

export interface SupplierState {
    suppliers: Paginated<Supplier>;
    suppliersLoaded: boolean;
    suppliersLoading: boolean;
    supplierCriteria: SupplierCriteria;
    supplier: Supplier;
    supplierLoaded: boolean;
    supplierLoading: boolean;
    supplierSaved: boolean;
    supplierSaving: boolean;
    supplierDeleting: boolean;
    supplierDeleted: boolean;
}

const initialState: SupplierState = {
    suppliers: { items: [], totalItems: 0 },
    suppliersLoaded: false,
    suppliersLoading: false,
    supplierCriteria: SUPPLIER_DEFAULT_CRITERIA,
    supplier: undefined,
    supplierLoaded: false,
    supplierLoading: false,
    supplierSaving: false,
    supplierSaved: false,
    supplierDeleting: false,
    supplierDeleted: false
};

const loadSuppliers = (state: SupplierState, action: LoadSuppliers): SupplierState => ({
    ...state,
    suppliersLoading: true,
    suppliersLoaded: false,
    supplierCriteria: action.payload
});

const loadSuppliersFail = (state: SupplierState, action: LoadSuppliersFail): SupplierState => ({
    ...state,
    suppliersLoading: false,
    suppliersLoaded: false
});

const loadSuppliersSuccess = (
    state: SupplierState,
    action: LoadSuppliersSuccess
): SupplierState => ({
    ...state,
    suppliersLoading: false,
    suppliersLoaded: true,
    suppliers: action.payload
});

const loadSupplier = (state: SupplierState, action: LoadSupplier): SupplierState => ({
    ...state,
    supplierLoading: true,
    supplierLoaded: false
});

const loadSupplierFail = (state: SupplierState, action: LoadSupplierFail): SupplierState => ({
    ...state,
    supplierLoading: false,
    supplierLoaded: false
});

const loadSupplierSuccess = (state: SupplierState, action: LoadSupplierSuccess): SupplierState => ({
    ...state,
    supplierLoading: false,
    supplierLoaded: true,
    supplier: action.payload
});

const saveSupplier = (state: SupplierState, action: SaveSupplier): SupplierState => ({
    ...state,
    supplierSaving: true,
    supplierSaved: false
});

const saveSupplierFail = (state: SupplierState, action: SaveSupplierFail): SupplierState => ({
    ...state,
    supplierSaving: false,
    supplierSaved: false
});

const saveSupplierSuccess = (state: SupplierState, action: SaveSupplierSuccess): SupplierState => ({
    ...state,
    supplierSaving: false,
    supplierSaved: true
});

const deleteSupplier = (state: SupplierState, action: DeleteSupplier): SupplierState => ({
    ...state,
    supplierDeleting: true,
    supplierDeleted: false
});

const deleteSupplierFail = (state: SupplierState, action: DeleteSupplierFail): SupplierState => ({
    ...state,
    supplierDeleting: false,
    supplierSaved: false
});

const deleteSupplierSuccess = (
    state: SupplierState,
    action: DeleteSupplierSuccess
): SupplierState => ({
    ...state,
    supplierDeleting: false,
    supplierDeleted: true
});

// tslint:disable-next-line:cyclomatic-complexity
export function masterDetailReducer(
    state: SupplierState = initialState,
    action: SupplierAction
): SupplierState {
    switch (action.type) {
        case SupplierActionTypes.LOAD_SUPPLIER_MODELS:
            return loadSuppliers(state, action);
        case SupplierActionTypes.LOAD_SUPPLIER_MODELS_FAIL:
            return loadSuppliersFail(state, action);
        case SupplierActionTypes.LOAD_SUPPLIER_MODELS_SUCCESS:
            return loadSuppliersSuccess(state, action);
        case SupplierActionTypes.LOAD_SUPPLIER_MODEL:
            return loadSupplier(state, action);
        case SupplierActionTypes.LOAD_SUPPLIER_MODEL_FAIL:
            return loadSupplierFail(state, action);
        case SupplierActionTypes.LOAD_SUPPLIER_MODEL_SUCCESS:
            return loadSupplierSuccess(state, action);
        case SupplierActionTypes.SAVE_SUPPLIER_MODEL:
            return saveSupplier(state, action);
        case SupplierActionTypes.SAVE_SUPPLIER_MODEL_FAIL:
            return saveSupplierFail(state, action);
        case SupplierActionTypes.SAVE_SUPPLIER_MODEL_SUCCESS:
            return saveSupplierSuccess(state, action);
        case SupplierActionTypes.DELETE_SUPPLIER_MODEL:
            return deleteSupplier(state, action);
        case SupplierActionTypes.DELETE_SUPPLIER_MODEL_FAIL:
            return deleteSupplierFail(state, action);
        case SupplierActionTypes.DELETE_SUPPLIER_MODEL_SUCCESS:
            return deleteSupplierSuccess(state, action);
        default:
            return state;
    }
}
