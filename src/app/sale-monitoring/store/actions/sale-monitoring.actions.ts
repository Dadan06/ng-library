import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { PaginatedSale, Sale } from 'src/app/sale/types/sale.interface';
import { SaleCriteria } from '../../types/sale-criteria.interface';

export enum SaleMonitoringActionTypes {
    LOAD_SALES = '[Sale Monitoring] Load Sales',
    LOAD_SALES_FAIL = '[Sale Monitoring] Load Sales Fail',
    LOAD_SALES_SUCCESS = '[Sale Monitoring] Load Sales Success',
    LOAD_SALE = '[Sale] Load Sale'
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

export class LoadSale implements Action {
    readonly type = SaleMonitoringActionTypes.LOAD_SALE;
    constructor(public payload: Sale) {}
}

export type SaleMonitoringAction = LoadSales | LoadSalesFail | LoadSalesSuccess | LoadSale;
