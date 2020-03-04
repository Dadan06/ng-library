import { Sale } from 'src/app/sale/types/sale.interface';
import { FilterUpdates } from 'src/app/shared/types/filter-updates.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SALE_DEFAULT_CRITERIA } from '../../constants/sale-monitoring.constant';
import { SaleCriteria } from '../../types/sale-criteria.interface';
import {
    LoadSale,
    LoadSaleFail,
    LoadSales,
    LoadSalesFail,
    LoadSalesSuccess,
    LoadSaleSuccess,
    SaleMonitoringAction,
    SaleMonitoringActionTypes
} from '../actions/sale-monitoring.actions';

export interface SaleMonitoringState {
    sales: Paginated<Sale>;
    salesLoaded: boolean;
    salesLoading: boolean;
    saleCriteria: SaleCriteria;
    saleFilterUpdates: FilterUpdates;
    saleLoading: boolean;
    saleLoaded: boolean;
    sale: Sale;
}

const initialState: SaleMonitoringState = {
    sales: { items: [], totalItems: 0 },
    salesLoaded: false,
    salesLoading: false,
    saleCriteria: SALE_DEFAULT_CRITERIA,
    saleFilterUpdates: undefined,
    saleLoading: false,
    saleLoaded: false,
    sale: undefined
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

const loadSale = (state: SaleMonitoringState, action: LoadSale): SaleMonitoringState => ({
    ...state,
    saleLoading: true,
    saleLoaded: false
});

const loadSaleFail = (state: SaleMonitoringState, action: LoadSaleFail): SaleMonitoringState => ({
    ...state,
    saleLoading: false,
    saleLoaded: false
});

const loadSaleSuccess = (
    state: SaleMonitoringState,
    action: LoadSaleSuccess
): SaleMonitoringState => ({
    ...state,
    saleLoading: false,
    saleLoaded: true,
    sale: action.payload
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
        case SaleMonitoringActionTypes.LOAD_SALE:
            return loadSale(state, action);
        case SaleMonitoringActionTypes.LOAD_SALE_FAIL:
            return loadSaleFail(state, action);
        case SaleMonitoringActionTypes.LOAD_SALE_SUCCESS:
            return loadSaleSuccess(state, action);
        default:
            return initialState;
    }
}
