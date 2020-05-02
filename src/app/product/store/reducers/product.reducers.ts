import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { PRODUCT_DEFAULT_CRITERIA } from '../../constants/product.constants';
import { Product } from '../../types/product.interface';
import {
    DeleteProduct,
    DeleteProductFail,
    DeleteProductSuccess,
    LoadProduct,
    LoadProductFail,
    LoadProducts,
    LoadProductsFail,
    LoadProductsSuccess,
    LoadProductSuccess,
    ProductAction,
    ProductActionTypes,
    SaveProduct,
    SaveProductFail,
    SaveProductSuccess
} from '../actions/product.actions';

export interface ProductState {
    products: Paginated<Product>;
    productsLoaded: boolean;
    productsLoading: boolean;
    productCriteria: ListCriteria;
    product: Product;
    productLoaded: boolean;
    productLoading: boolean;
    productSaved: boolean;
    productSaving: boolean;
    productDeleting: boolean;
    productDeleted: boolean;
}

const initialState: ProductState = {
    products: { items: [], totalItems: 0 },
    productsLoaded: false,
    productsLoading: false,
    productCriteria: PRODUCT_DEFAULT_CRITERIA,
    product: undefined,
    productLoaded: false,
    productLoading: false,
    productSaving: false,
    productSaved: false,
    productDeleting: false,
    productDeleted: false
};

const loadProducts = (state: ProductState, action: LoadProducts): ProductState => ({
    ...state,
    productsLoading: true,
    productsLoaded: false,
    productCriteria: action.payload
});

const loadProductsFail = (state: ProductState, action: LoadProductsFail): ProductState => ({
    ...state,
    productsLoading: false,
    productsLoaded: false
});

const loadProductsSuccess = (state: ProductState, action: LoadProductsSuccess): ProductState => ({
    ...state,
    productsLoading: false,
    productsLoaded: true,
    products: action.payload
});

const loadProduct = (state: ProductState, action: LoadProduct): ProductState => ({
    ...state,
    productLoading: true,
    productLoaded: false
});

const loadProductFail = (state: ProductState, action: LoadProductFail): ProductState => ({
    ...state,
    productLoading: false,
    productLoaded: false
});

const loadProductSuccess = (state: ProductState, action: LoadProductSuccess): ProductState => ({
    ...state,
    productLoading: false,
    productLoaded: true,
    product: action.payload
});

const saveProduct = (state: ProductState, action: SaveProduct): ProductState => ({
    ...state,
    productSaving: true,
    productSaved: false
});

const saveProductFail = (state: ProductState, action: SaveProductFail): ProductState => ({
    ...state,
    productSaving: false,
    productSaved: false
});

const saveProductSuccess = (state: ProductState, action: SaveProductSuccess): ProductState => ({
    ...state,
    productSaving: false,
    productSaved: true
});

const deleteProduct = (state: ProductState, action: DeleteProduct): ProductState => ({
    ...state,
    productDeleting: true,
    productDeleted: false
});

const deleteProductFail = (state: ProductState, action: DeleteProductFail): ProductState => ({
    ...state,
    productDeleting: false,
    productSaved: false
});

const deleteProductSuccess = (state: ProductState, action: DeleteProductSuccess): ProductState => ({
    ...state,
    productDeleting: false,
    productDeleted: true
});

// tslint:disable-next-line:cyclomatic-complexity
export function productReducer(
    state: ProductState = initialState,
    action: ProductAction
): ProductState {
    switch (action.type) {
        case ProductActionTypes.LOAD_PRODUCTS:
            return loadProducts(state, action);
        case ProductActionTypes.LOAD_PRODUCTS_FAIL:
            return loadProductsFail(state, action);
        case ProductActionTypes.LOAD_PRODUCTS_SUCCESS:
            return loadProductsSuccess(state, action);
        case ProductActionTypes.LOAD_PRODUCT:
            return loadProduct(state, action);
        case ProductActionTypes.LOAD_PRODUCT_FAIL:
            return loadProductFail(state, action);
        case ProductActionTypes.LOAD_PRODUCT_SUCCESS:
            return loadProductSuccess(state, action);
        case ProductActionTypes.SAVE_PRODUCT:
            return saveProduct(state, action);
        case ProductActionTypes.SAVE_PRODUCT_FAIL:
            return saveProductFail(state, action);
        case ProductActionTypes.SAVE_PRODUCT_SUCCESS:
            return saveProductSuccess(state, action);
        case ProductActionTypes.DELETE_PRODUCT:
            return deleteProduct(state, action);
        case ProductActionTypes.DELETE_PRODUCT_FAIL:
            return deleteProductFail(state, action);
        case ProductActionTypes.DELETE_PRODUCT_SUCCESS:
            return deleteProductSuccess(state, action);
        default:
            return state;
    }
}
