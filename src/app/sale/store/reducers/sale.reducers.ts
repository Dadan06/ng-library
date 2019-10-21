import { HttpErrorResponse } from '@angular/common/http';
import { PRODUCT_DEFAULT_CRITERIA } from 'src/app/product/constants/product.constants';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { SaleItem } from '../../types/sale-item.interface';
import {
    AddProduct,
    AddProductFail,
    AddProductSuccess,
    CancelSale,
    CancelSaleFail,
    CancelSaleSuccess,
    DeleteSaleItem,
    DeleteSaleItemFail,
    DeleteSaleItemSuccess,
    LoadProducts,
    LoadProductsFail,
    LoadProductsSuccess,
    NewSale,
    SaleAction,
    SaleActionTypes
} from '../actions/sale.actions';

export interface SaleState {
    products: Paginated<Product>;
    productsLoaded: boolean;
    productsLoading: boolean;
    productCriteria: ProductCriteria;
    saleId: string;
    no: number;
    saleItems: SaleItem[];
    productAdding: boolean;
    productAdded: boolean;
    productAdditionError: HttpErrorResponse;
    saleItemDeleting: boolean;
    saleItemDeleted: boolean;
    saleCanceling: boolean;
    saleCanceled: boolean;
}

const initialState = {
    products: { items: [], totalItems: 0 },
    productsLoaded: false,
    productsLoading: false,
    productCriteria: PRODUCT_DEFAULT_CRITERIA,
    saleId: null,
    no: null,
    saleItems: [],
    productAdding: false,
    productAdded: false,
    productAdditionError: undefined,
    saleItemDeleting: false,
    saleItemDeleted: false,
    saleCanceling: false,
    saleCanceled: false
};

const loadProducts = (state: SaleState, action: LoadProducts): SaleState => ({
    ...state,
    productsLoading: true,
    productsLoaded: false,
    productCriteria: action.payload
});

const loadProductsFail = (state: SaleState, action: LoadProductsFail): SaleState => ({
    ...state,
    productsLoading: false,
    productsLoaded: false
});

const loadProductsSuccess = (state: SaleState, action: LoadProductsSuccess): SaleState => ({
    ...state,
    productsLoading: false,
    productsLoaded: true,
    products: action.payload
});

const newSale = (state: SaleState, action: NewSale): SaleState => ({
    ...state,
    saleId: action.payload._id,
    no: action.payload.no
});

const addProduct = (state: SaleState, action: AddProduct): SaleState => ({
    ...state,
    productAdding: true,
    productAdded: false
});

const addProductFail = (state: SaleState, action: AddProductFail): SaleState => ({
    ...state,
    productAdding: false,
    productAdded: false,
    productAdditionError: action.payload
});

const addProductSuccess = (state: SaleState, action: AddProductSuccess): SaleState => ({
    ...state,
    productAdding: false,
    productAdded: true,
    saleItems: [...state.saleItems, action.payload]
});

const deleteSaleItem = (state: SaleState, action: DeleteSaleItem): SaleState => ({
    ...state,
    saleItemDeleting: true,
    saleItemDeleted: false
});

const deleteSaleItemSuccess = (state: SaleState, action: DeleteSaleItemSuccess): SaleState => ({
    ...state,
    saleItemDeleting: false,
    saleItemDeleted: true,
    saleItems: state.saleItems.map(s => (s._id === action.payload._id ? action.payload : s))
});

const deleteSaleItemFail = (state: SaleState, action: DeleteSaleItemFail): SaleState => ({
    ...state,
    saleItemDeleting: false,
    saleItemDeleted: false
});

const cancelSale = (state: SaleState, action: CancelSale): SaleState => ({
    ...state,
    saleCanceling: true,
    saleCanceled: false
});

const cancelSaleFail = (state: SaleState, action: CancelSaleFail): SaleState => ({
    ...state,
    saleCanceling: false,
    saleCanceled: false
});

const cancelSaleSuccess = (state: SaleState, action: CancelSaleSuccess): SaleState => ({
    ...state,
    saleCanceling: false,
    saleCanceled: true
});

// tslint:disable-next-line: cyclomatic-complexity
export function saleReducer(state: SaleState = initialState, action: SaleAction): SaleState {
    switch (action.type) {
        case SaleActionTypes.LOAD_PRODUCTS:
            return loadProducts(state, action);
        case SaleActionTypes.LOAD_PRODUCTS_FAIL:
            return loadProductsFail(state, action);
        case SaleActionTypes.LOAD_PRODUCTS_SUCCESS:
            return loadProductsSuccess(state, action);
        case SaleActionTypes.NEW_SALE:
            return newSale(state, action);
        case SaleActionTypes.ADD_PRODUCT:
            return addProduct(state, action);
        case SaleActionTypes.ADD_PRODUCT_FAIL:
            return addProductFail(state, action);
        case SaleActionTypes.ADD_PRODUCT_SUCCESS:
            return addProductSuccess(state, action);
        case SaleActionTypes.DELETE_SALE_ITEM:
            return deleteSaleItem(state, action);
        case SaleActionTypes.DELETE_SALE_ITEM_FAIL:
            return deleteSaleItemFail(state, action);
        case SaleActionTypes.DELETE_SALE_ITEM_SUCCESS:
            return deleteSaleItemSuccess(state, action);
        case SaleActionTypes.CANCEL_SALE:
            return cancelSale(state, action);
        case SaleActionTypes.CANCEL_SALE_FAIL:
            return cancelSaleFail(state, action);
        case SaleActionTypes.CANCEL_SALE_SUCCESS:
            return cancelSaleSuccess(state, action);
        case SaleActionTypes.CLEAR_SALE:
            return {
                ...initialState,
                products: state.products,
                productCriteria: state.productCriteria
            };
        default:
            return state;
    }
}
