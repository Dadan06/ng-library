import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SaleItem } from '../../types/sale-item.interface';
import { Payment, Sale } from '../../types/sale.interface';

export const enum SaleActionTypes {
    LOAD_PRODUCTS = '[Product] Load Products',
    LOAD_PRODUCTS_FAIL = '[Product] Load Products Fail',
    LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success',
    SAVE_SALE = '[Sale] Save Sale',
    SAVE_SALE_FAIL = '[Sale] Save Sale Fail',
    SAVE_SALE_SUCCESS = '[Sale] Save Sale Success',
    LOAD_CONSIGNATIONS = '[Sale] Load Consignations',
    LOAD_CONSIGNATIONS_FAIL = '[Sale] Load Consignations Fail',
    LOAD_CONSIGNATIONS_SUCCESS = '[Sale] Load Consignations Success',
    LOAD_CONSIGNATION_ITEM = '[Sale] Load Consignation Item',
    LOAD_CONSIGNATION_ITEM_FAIL = '[Sale] Load Consignation Item Fail',
    LOAD_CONSIGNATION_ITEM_SUCCESS = '[Sale] Load Consignation Item Success',
    SAVE_CONSIGNATION = '[Sale] Save Consignation',
    SAVE_CONSIGNATION_FAIL = '[Sale] Save Consignation Fail',
    SAVE_CONSIGNATION_SUCCESS = '[Sale] Save Consignation Success',
    EXPORT_PDF = '[Sale] Export PDF',
    EXPORT_PDF_FAIL = '[Sale] Export PDF Fail',
    EXPORT_PDF_SUCCESS = '[Sale] Export PDF Success',
    ADD_AS_SALE_ITEM = '[Sale] Add As Sale Item'
}

export class LoadProducts implements Action {
    readonly type = SaleActionTypes.LOAD_PRODUCTS;
    constructor(public payload: ProductCriteria) {}
}

export class LoadProductsSuccess implements Action {
    readonly type = SaleActionTypes.LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: Paginated<Product>) {}
}

export class LoadProductsFail implements Action {
    readonly type = SaleActionTypes.LOAD_PRODUCTS_FAIL;
    constructor(public payload: Error) {}
}

export class SaveSale implements Action {
    readonly type = SaleActionTypes.SAVE_SALE;
    constructor(public payload: Sale) {}
}

export class SaveSaleFail implements Action {
    readonly type = SaleActionTypes.SAVE_SALE_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class SaveSaleSuccess implements Action {
    readonly type = SaleActionTypes.SAVE_SALE_SUCCESS;
    constructor(public payload: Payment) {}
}

export class LoadConsignations implements Action {
    readonly type = SaleActionTypes.LOAD_CONSIGNATIONS;
    constructor(public payload: ListCriteria) {}
}

export class LoadConsignationsFail implements Action {
    readonly type = SaleActionTypes.LOAD_CONSIGNATIONS_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadConsignationsSuccess implements Action {
    readonly type = SaleActionTypes.LOAD_CONSIGNATIONS_SUCCESS;
    constructor(public payload: Paginated<Payment>) {}
}

export class LoadConsignationItem implements Action {
    readonly type = SaleActionTypes.LOAD_CONSIGNATION_ITEM;
    constructor(public payload: string) {}
}

export class LoadConsignationItemFail implements Action {
    readonly type = SaleActionTypes.LOAD_CONSIGNATION_ITEM_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class LoadConsignationItemSuccess implements Action {
    readonly type = SaleActionTypes.LOAD_CONSIGNATION_ITEM_SUCCESS;
    constructor(public payload: SaleItem) {}
}

export class SaveConsignation implements Action {
    readonly type = SaleActionTypes.SAVE_CONSIGNATION;
    constructor(public payload: SaleItem) {}
}

export class SaveConsignationFail implements Action {
    readonly type = SaleActionTypes.SAVE_CONSIGNATION_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class SaveConsignationSuccess implements Action {
    readonly type = SaleActionTypes.SAVE_CONSIGNATION_SUCCESS;
    constructor(public payload: SaleItem) {}
}

export class ExportPdf implements Action {
    readonly type = SaleActionTypes.EXPORT_PDF;
    constructor(public payload: Payment) {}
}

export class ExportPdfFail implements Action {
    readonly type = SaleActionTypes.EXPORT_PDF_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class ExportPdfSuccess implements Action {
    readonly type = SaleActionTypes.EXPORT_PDF_SUCCESS;
}

export class AddAsSaleItem implements Action {
    readonly type = SaleActionTypes.ADD_AS_SALE_ITEM;
    constructor(public payload: Product) {}
}

export type SaleAction =
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail
    | SaveSale
    | SaveSaleFail
    | SaveSaleSuccess
    | LoadConsignations
    | LoadConsignationsFail
    | LoadConsignationsSuccess
    | LoadConsignationItem
    | LoadConsignationItemFail
    | LoadConsignationItemSuccess
    | SaveConsignation
    | SaveConsignationFail
    | SaveConsignationSuccess
    | ExportPdf
    | ExportPdfFail
    | ExportPdfSuccess
    | AddAsSaleItem;
