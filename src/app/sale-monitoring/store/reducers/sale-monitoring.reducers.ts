import { Sale } from 'src/app/sale/types/sale.interface';
import { FilterUpdates } from 'src/app/shared/types/filter-updates.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SALE_DEFAULT_CRITERIA } from '../../constants/sale-monitoring.constant';
import { SaleCriteria } from '../../types/sale-criteria.interface';
import {
    LoadSales,
    LoadSalesFail,
    LoadSalesSuccess,
    SaleMonitoringAction,
    SaleMonitoringActionTypes
} from '../actions/sale-monitoring.actions';

export interface SaleMonitoringState {
    sales: Paginated<Sale>;
    salesLoaded: boolean;
    salesLoading: boolean;
    saleCriteria: SaleCriteria;
    saleFilterUpdates: FilterUpdates;
}

const initialState: SaleMonitoringState = {
    sales: { items: [], totalItems: 0 },
    salesLoaded: false,
    salesLoading: false,
    saleCriteria: SALE_DEFAULT_CRITERIA,
    saleFilterUpdates: undefined
};

const loadSales = (state: SaleMonitoringState, action: LoadSales): SaleMonitoringState => ({
    ...state,
    salesLoading: true,
    salesLoaded: false,
    saleCriteria: action.payload
});

const loadSalesFail = (state: SaleMonitoringState, action: LoadSalesFail): SaleMonitoringState => ({
    ...state,
    salesLoading: false,
    salesLoaded: false
});

const loadSalesSuccess = (
    state: SaleMonitoringState,
    action: LoadSalesSuccess
): SaleMonitoringState => ({
    ...state,
    salesLoading: false,
    salesLoaded: true,
    sales: action.payload,
    saleFilterUpdates: action.payload.filter
});

export function saleMonitoringReducer(
    state: SaleMonitoringState = initialState,
    action: SaleMonitoringAction
): SaleMonitoringState {
    switch (action.type) {
        case SaleMonitoringActionTypes.LOAD_SALES:
            return loadSales(state, action);
        case SaleMonitoringActionTypes.LOAD_SALES_FAIL:
            return loadSalesFail(state, action);
        case SaleMonitoringActionTypes.LOAD_SALES_SUCCESS:
            return loadSalesSuccess(state, action);
        default:
            return initialState;
    }
}
