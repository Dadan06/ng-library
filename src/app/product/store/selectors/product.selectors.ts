import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { getRouterState } from 'src/app/core/store/selectors/router.selectors';
import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { Product } from '../../types/product.interface';
import { ProductState } from '../reducers/product.reducers';

export const getProductState = createFeatureSelector<ProductState>('product');

export const getPaginatedProducts = createSelector(
    getProductState,
    (state: ProductState) => state.products
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
    getProductState,
    (state: ProductState) => state.productCriteria
);

export const getProductsLoading = createSelector<ProductState, ProductState, boolean>(
    getProductState,
    (state: ProductState) => state.productsLoading
);

export const getProduct = createSelector(
    getProductState,
    (state: ProductState) => state.product
);

export const getProductLoading = createSelector<ProductState, ProductState, boolean>(
    getProductState,
    (state: ProductState) => state.productLoading
);

export const getProductSaving = createSelector<ProductState, ProductState, boolean>(
    getProductState,
    (state: ProductState) => state.productSaving
);

export const getProductSaved = createSelector<ProductState, ProductState, boolean>(
    getProductState,
    (state: ProductState) => state.productSaved
);

export const getProductEditEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.EDIT_PRODUCT)
);

export const getProductDeleteEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.DELETE_PRODUCT)
);

export const getProductCreateEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.CREATE_PRODUCT)
);

export const getProductEditing = createSelector<
    ProductState,
    RouterReducerState<AppRouterState>,
    boolean
>(
    getRouterState,
    router => router.state.url.includes('product/edit') || router.state.url.includes('product/new')
);
