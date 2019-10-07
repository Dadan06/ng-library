import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { AppRouterState } from '../../../core/store/reducers/router.reducers';
import { getRouterState } from '../../../core/store/selectors/router.selectors';
import { Supplier } from '../../types/supplier.interface';
import { SupplierState } from '../reducers/supplier.reducers';

export const getSupplierState = createFeatureSelector<SupplierState>('supplier');

export const getPaginatedSuppliers = createSelector(
    getSupplierState,
    (state: SupplierState) => state.suppliers
);

export const getSuppliers = createSelector(
    getPaginatedSuppliers,
    (paginatedSuppliers: Paginated<Supplier>) => paginatedSuppliers.items
);

export const getSuppliersTotalItems = createSelector(
    getPaginatedSuppliers,
    (paginatedSuppliers: Paginated<Supplier>) => paginatedSuppliers.totalItems
);

export const getSupplierCriteria = createSelector(
    getSupplierState,
    (state: SupplierState) => state.supplierCriteria
);

export const getSuppliersLoading = createSelector<SupplierState, SupplierState, boolean>(
    getSupplierState,
    (state: SupplierState) => state.suppliersLoading
);

export const getSupplier = createSelector(
    getSupplierState,
    (state: SupplierState) => state.supplier
);

export const getSupplierLoading = createSelector<SupplierState, SupplierState, boolean>(
    getSupplierState,
    (state: SupplierState) => state.supplierLoading
);

export const getSupplierSaving = createSelector<SupplierState, SupplierState, boolean>(
    getSupplierState,
    (state: SupplierState) => state.supplierSaving
);

export const getSupplierSaved = createSelector<SupplierState, SupplierState, boolean>(
    getSupplierState,
    (state: SupplierState) => state.supplierSaved
);

export const getSupplierEditEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.EDIT_SUPPLIER)
);

export const getSupplierDeleteEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.DELETE_SUPPLIER)
);

export const getSupplierCreateEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.CREATE_SUPPLIER)
);

export const getSupplierEditing = createSelector<
    SupplierState,
    RouterReducerState<AppRouterState>,
    boolean
>(
    getRouterState,
    router =>
        router.state.url.includes('supplier/edit') || router.state.url.includes('supplier/new')
);
