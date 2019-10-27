import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SaleItem } from '../../types/sale-item.interface';
import { Sale } from '../../types/sale.interface';

export const enum SaleActionTypes {
    LOAD_PRODUCTS = '[Product] Load Products',
    LOAD_PRODUCTS_FAIL = '[Product] Load Products Fail',
    LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success',
    NEW_SALE = '[Sale] New Sale',
    ADD_PRODUCT = '[Sale] Add Product',
    ADD_PRODUCT_FAIL = '[Sale] Add Product Fail',
    ADD_PRODUCT_SUCCESS = '[Sale] Add Product Success',
    CLEAR_SALE = '[Sale] Clear Sale',
    DELETE_SALE_ITEM = '[Sale] Delete Sale Item',
    DELETE_SALE_ITEM_SUCCESS = '[Sale] Delete Sale Item Success',
    DELETE_SALE_ITEM_FAIL = '[Sale] Delete Sale Item Fail',
    CANCEL_SALE = '[Sale] Cancel Sale',
    CANCEL_SALE_SUCCESS = '[Sale] Cancel Sale Success',
    CANCEL_SALE_FAIL = '[Sale] Cancel Sale Fail',
    CLEAR_PRODUCT_ADDITION_ERROR = '[Sale] Clear Product Addition Error'
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

export class NewSale implements Action {
    readonly type = SaleActionTypes.NEW_SALE;
    constructor(public payload: Sale) {}
}

export class AddProduct implements Action {
    readonly type = SaleActionTypes.ADD_PRODUCT;
    constructor(public payload: Product) {}
}

export class AddProductFail implements Action {
    readonly type = SaleActionTypes.ADD_PRODUCT_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export class AddProductSuccess implements Action {
    readonly type = SaleActionTypes.ADD_PRODUCT_SUCCESS;
    constructor(public payload: SaleItem) {}
}

export class ClearSale implements Action {
    readonly type = SaleActionTypes.CLEAR_SALE;
}

export class DeleteSaleItem implements Action {
    readonly type = SaleActionTypes.DELETE_SALE_ITEM;
    constructor(public payload: SaleItem) {}
}

export class DeleteSaleItemSuccess implements Action {
    readonly type = SaleActionTypes.DELETE_SALE_ITEM_SUCCESS;
    constructor(public payload: SaleItem) {}
}

export class DeleteSaleItemFail implements Action {
    readonly type = SaleActionTypes.DELETE_SALE_ITEM_FAIL;
    constructor(public error: HttpErrorResponse) {}
}

export class CancelSale implements Action {
    readonly type = SaleActionTypes.CANCEL_SALE;
}

export class CancelSaleFail implements Action {
    readonly type = SaleActionTypes.CANCEL_SALE_FAIL;
    constructor(public payload: Error) {}
}

export class CancelSaleSuccess implements Action {
    readonly type = SaleActionTypes.CANCEL_SALE_SUCCESS;
}

export class ClearProductAdditionError implements Action {
    readonly type = SaleActionTypes.CLEAR_PRODUCT_ADDITION_ERROR;
}

export type SaleAction =
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail
    | NewSale
    | AddProduct
    | AddProductFail
    | AddProductSuccess
    | ClearSale
    | DeleteSaleItem
    | DeleteSaleItemSuccess
    | DeleteSaleItemFail
    | CancelSale
    | CancelSaleFail
    | CancelSaleSuccess
    | ClearProductAdditionError;
