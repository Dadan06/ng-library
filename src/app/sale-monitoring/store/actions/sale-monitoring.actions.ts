import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { PaginatedSale } from 'src/app/sale/types/sale.interface';
import { SaleCriteria } from '../../types/sale-criteria.interface';

export enum SaleMonitoringActionTypes {
    LOAD_SALES = '[Sale Monitoring] Load Sales',
    LOAD_SALES_FAIL = '[Sale Monitoring] Load Sales Fail',
    LOAD_SALES_SUCCESS = '[Sale Monitoring] Load Sales Success'
}

export class LoadSales implements Action {
    readonly type = SaleMonitoringActionTypes.LOAD_SALES;
    constructor(public payload: SaleCriteria) {}
}

export class LoadSalesFail implements Action {
    readonly type = SaleMonitoringActionTypes.LOAD_SALES_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadSalesSuccess implements Action {
    readonly type = SaleMonitoringActionTypes.LOAD_SALES_SUCCESS;
    constructor(public payload: PaginatedSale) {}
}

export type SaleMonitoringAction = LoadSales | LoadSalesFail | LoadSalesSuccess;
