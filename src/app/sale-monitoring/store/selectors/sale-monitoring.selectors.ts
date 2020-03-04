import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Sale } from 'src/app/sale/types/sale.interface';
import { FilterUpdates } from 'src/app/shared/types/filter-updates.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SaleCriteria } from '../../types/sale-criteria.interface';
import { SaleMonitoringState } from '../reducers/sale-monitoring.reducers';

export const getSaleMonitoringState = createFeatureSelector<SaleMonitoringState>('sale-monitoring');

export const getPaginatedSale = createSelector<
    SaleMonitoringState,
    SaleMonitoringState,
    Paginated<Sale>
>(getSaleMonitoringState, (state: SaleMonitoringState) => state.sales);

export const getSales = createSelector<SaleMonitoringState, Paginated<Sale>, Sale[]>(
    getPaginatedSale,
    (paginatedSale: Paginated<Sale>) => paginatedSale.items
);

export const getSalesTotalItem = createSelector<SaleMonitoringState, Paginated<Sale>, number>(
    getPaginatedSale,
    (paginatedSale: Paginated<Sale>) => paginatedSale.totalItems
);

export const getSaleFilterUpdates = createSelector<
    SaleMonitoringState,
    SaleMonitoringState,
    FilterUpdates
>(getSaleMonitoringState, (state: SaleMonitoringState) => state.saleFilterUpdates);

export const getSalesLoading = createSelector<SaleMonitoringState, SaleMonitoringState, boolean>(
    getSaleMonitoringState,
    (state: SaleMonitoringState) => state.salesLoading
);

export const getSaleCriteria = createSelector<
    SaleMonitoringState,
    SaleMonitoringState,
    SaleCriteria
>(getSaleMonitoringState, (state: SaleMonitoringState) => state.saleCriteria);

export const getSale = createSelector<SaleMonitoringState, SaleMonitoringState, Sale>(
    getSaleMonitoringState,
    (state: SaleMonitoringState) => state.sale
);
