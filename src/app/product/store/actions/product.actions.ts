import { Action } from '@ngrx/store';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { ProductCriteria } from '../../types/product-criteria.interface';
import { Product } from '../../types/product.interface';

export const enum ProductActionTypes {
    LOAD_PRODUCT_MODELS = '[Product] Load Products',
    LOAD_PRODUCT_MODELS_FAIL = '[Product] Load Products Fail',
    LOAD_PRODUCT_MODELS_SUCCESS = '[Product] Load Products Success',
    LOAD_PRODUCT_MODEL = '[Product] Load Product',
    LOAD_PRODUCT_MODEL_FAIL = '[Product] Load Product Fail',
    LOAD_PRODUCT_MODEL_SUCCESS = '[Product] Load Product Success',
    DELETE_PRODUCT_MODEL = '[Product] Delete Product',
    DELETE_PRODUCT_MODEL_FAIL = '[Product] Delete Product Fail',
    DELETE_PRODUCT_MODEL_SUCCESS = '[Product] Delete Product Success',
    SAVE_PRODUCT_MODEL = '[Product] Save Product',
    SAVE_PRODUCT_MODEL_FAIL = '[Product] Save Product Fail',
    SAVE_PRODUCT_MODEL_SUCCESS = '[Product] Save Product Success'
}

export class LoadProducts implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_MODELS;
    constructor(public payload: ProductCriteria) {}
}

export class LoadProductsSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_MODELS_SUCCESS;
    constructor(public payload: Paginated<Product>) {}
}

export class LoadProductsFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_MODELS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadProduct implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_MODEL;
    constructor(public payload: string) {}
}

export class LoadProductSuccess implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_MODEL_SUCCESS;
    constructor(public payload: Product) {}
}

export class LoadProductFail implements Action {
    readonly type = ProductActionTypes.LOAD_PRODUCT_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveProduct implements Action {
    readonly type = ProductActionTypes.SAVE_PRODUCT_MODEL;
    constructor(public payload: Product) {}
}

export class SaveProductFail implements Action {
    readonly type = ProductActionTypes.SAVE_PRODUCT_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveProductSuccess implements Action {
    readonly type = ProductActionTypes.SAVE_PRODUCT_MODEL_SUCCESS;
    constructor(public payload: Product) {}
}

export class DeleteProduct implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_MODEL;
    constructor(public payload: Product) {}
}

export class DeleteProductFail implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class DeleteProductSuccess implements Action {
    readonly type = ProductActionTypes.DELETE_PRODUCT_MODEL_SUCCESS;
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
    | SaveProductSuccess;
