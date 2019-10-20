import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from 'src/app/product/types/product.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SaleItem, SaleItemStatus } from '../../types/sale-item.interface';
import { Sale, SaleStatus } from '../../types/sale.interface';
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

export const getSale = createSelector<SaleState, SaleState, Sale>(
    getSaleState,
    (state: SaleState) =>
        (({
            _id: state.saleId,
            no: state.no,
            saleItems: state.saleItems.map(({ _id, ...rest }) => rest),
            orderDate: new Date(),
            status: SaleStatus.ORDERED
        } as unknown) as Sale)
);

export const getOrderedSaleItems = createSelector<SaleState, SaleState, SaleItem[]>(
    getSaleState,
    (state: SaleState) => state.saleItems.filter(s => s.status === SaleItemStatus.ORDERED)
);
