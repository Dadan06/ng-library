import { HttpErrorResponse } from '@angular/common/http';
import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { getRouterState } from 'src/app/core/store/selectors/router.selectors';
import { Product } from 'src/app/product/types/product.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SaleItem } from '../../types/sale-item.interface';
import { Payment } from '../../types/sale.interface';
import { SaleState } from '../reducers/sale.reducers';

export const getSaleState = createFeatureSelector<SaleState>('sale');

export const getPaginatedProducts = createSelector(
    getSaleState,
    (state: SaleState) => state.products
);

export const getProducts = createSelector(
    getPaginatedProducts,
    (paginatedProducts: Paginated<Product>) => paginatedProducts.items
);

export const getProductsTotalItems = createSelector(
    getPaginatedProducts,
    (paginatedProducts: Paginated<Product>) => paginatedProducts.totalItems
);

export const getProductCriteria = createSelector(
    getSaleState,
    (state: SaleState) => state.productCriteria
);

export const getProductsLoading = createSelector<SaleState, SaleState, boolean>(
    getSaleState,
    (state: SaleState) => state.productsLoading
);

export const getSaleSaved = createSelector<SaleState, SaleState, boolean>(
    getSaleState,
    (state: SaleState) => state.saleSaved
);

export const getSaleSaveFail = createSelector<SaleState, SaleState, boolean>(
    getSaleState,
    (state: SaleState) => !!state.saleSaveError
);
export const getSaleSaveError = createSelector<SaleState, SaleState, HttpErrorResponse>(
    getSaleState,
    (state: SaleState) => state.saleSaveError
);

export const getPaginatedConsignations = createSelector(
    getSaleState,
    (state: SaleState) => state.consignations
);

export const getConsignations = createSelector(
    getPaginatedConsignations,
    (paginatedConsignations: Paginated<Payment>) => paginatedConsignations.items
);

export const getConsignationsTotalItems = createSelector(
    getPaginatedConsignations,
    (paginatedConsignations: Paginated<Payment>) => paginatedConsignations.totalItems
);

export const getConsignationCriteria = createSelector(
    getSaleState,
    (state: SaleState) => state.consignationCriteria
);

export const getConsignationsLoading = createSelector(
    getSaleState,
    (sale: SaleState) => sale.consignationsLoading
);

export const getConsignation = createSelector(getSaleState, (sale: SaleState) => sale.consignation);

export const getConsignationEditing = createSelector<
    SaleState,
    RouterReducerState<AppRouterState>,
    boolean
>(getRouterState, router => router.state.url.includes('consignation/edit'));

export const getPdfExporting = createSelector<SaleState, SaleState, boolean>(
    getSaleState,
    (state: SaleState) => state.pdfExporting
);

export const getNewAddedSaleItem = createSelector<SaleState, SaleState, SaleItem>(
    getSaleState,
    (state: SaleState) => state.newAddedSaleItem
);
