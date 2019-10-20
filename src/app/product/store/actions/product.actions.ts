import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { ProductCriteria } from '../../types/product-criteria.interface';
import { Product } from '../../types/product.interface';

export const enum ProductActionTypes {
    LOAD_PRODUCTS = '[Product] Load Products',
    LOAD_PRODUCTS_FAIL = '[Product] Load Products Fail',
    LOAD_PRODUCTS_SUCCESS = '[Product] Load Products Success',
    LOAD_PRODUCT = '[Product] Load Product',
    LOAD_PRODUCT_FAIL = '[Product] Load Product Fail',
    LOAD_PRODUCT_SUCCESS = '[Product] Load Product Success',
    DELETE_PRODUCT = '[Product] Delete Product',
    DELETE_PRODUCT_FAIL = '[Product] Delete Product Fail',
    DELETE_PRODUCT_SUCCESS = '[Product] Delete Product Success',
    SAVE_PRODUCT = '[Product] Save Product',
    SAVE_PRODUCT_FAIL = '[Product] Save Product Fail',
    SAVE_PRODUCT_SUCCESS = '[Product] Save Product Success',
    LOAD_ALL_SUPPLIER = '[Product] Load All Supplier',
    LOAD_ALL_SUPPLIER_FAIL = '[Product] Load All Supplier Fail',
    LOAD_ALL_SUPPLIER_SUCCESS = '[Product] Load All Supplier Success'
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS;
    constructor(public payload: ProductCriteria) {}
}

export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_SUCCESS;
    constructor(public payload: Paginated<Product>) {}
}

export class LoadProductsFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCTS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadProduct implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT;
    constructor(public payload: string) {}
}

export class LoadProductSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_SUCCESS;
    constructor(public payload: Product) {}
}

export class LoadProductFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_FAIL;
    constructor(public payload: Error) {}
}

export class SaveProduct implements Action {
    readonly type = ProductActionTypes.SAVE_PRODUCT;
    constructor(public payload: Product) {}
}

export class SaveProductFail implements Action {
    readonly type = ProductActionTypes.SAVE_PRODUCT_FAIL;
    constructor(public payload: Error) {}
}

export class SaveProductSuccess implements Action {
    readonly type = ProductActionTypes.SAVE_PRODUCT_SUCCESS;
    constructor(public payload: Product) {}
}

export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT;
    constructor(public payload: Product) {}
}

export class DeleteProductFail implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_FAIL;
    constructor(public payload: Error) {}
}

export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_SUCCESS;
}

export class LoadAllSupplier implements Action {
    readonly type = ProductActionTypes.LOAD_ALL_SUPPLIER;
}

export class LoadAllSupplierSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_ALL_SUPPLIER_SUCCESS;
    constructor(public payload: Supplier[]) {}
}

export class LoadAllSupplierFail implements Action {
    readonly type = ProductActionTypes.LOAD_ALL_SUPPLIER_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export type ProductAction =
    | LoadProducts
    | LoadProductsSuccess
    | LoadProductsFail
    | LoadProduct
    | LoadProductSuccess
    | LoadProductFail
    | DeleteProduct
    | DeleteProductFail
    | DeleteProductSuccess
    | SaveProduct
    | SaveProductFail
    | SaveProductSuccess
    | LoadAllSupplier
    | LoadAllSupplierFail
    | LoadAllSupplierSuccess;
