import { HttpErrorResponse } from '@angular/common/http';
import { PRODUCT_DEFAULT_CRITERIA } from 'src/app/product/constants/product.constants';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { SALE_DEFAULT_CRITERIA } from 'src/app/sale-monitoring/constants/sale-monitoring.constant';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { EMPTY_SALE_ITEM } from '../../constants/sale.constant';
import { SaleItem } from '../../types/sale-item.interface';
import { Payment } from '../../types/sale.interface';
import {
    AddAsSaleItem,
    ExportPdf,
    ExportPdfFail,
    ExportPdfSuccess,
    LoadConsignationItem,
    LoadConsignationItemFail,
    LoadConsignationItemSuccess,
    LoadConsignations,
    LoadConsignationsFail,
    LoadConsignationsSuccess,
    LoadProducts,
    LoadProductsFail,
    LoadProductsSuccess,
    SaleAction,
    SaleActionTypes,
    SaveConsignation,
    SaveConsignationFail,
    SaveConsignationSuccess,
    SaveSale,
    SaveSaleFail,
    SaveSaleSuccess
} from '../actions/sale.actions';

export interface SaleState {
    products: Paginated<Product>;
    productsLoaded: boolean;
    productsLoading: boolean;
    productCriteria: ProductCriteria;
    saleSaving: boolean;
    saleSaved: boolean;
    saleSaveError: HttpErrorResponse;
    consignations: Paginated<Payment>;
    consignationCriteria: ListCriteria;
    consignationsLoading: boolean;
    consignationsLoaded: boolean;
    saleItem: SaleItem;
    consignationItemLoading: boolean;
    consignationItemLoaded: boolean;
    pdfExporting: boolean;
    pdfExported: boolean;
    consignationSaving: boolean;
    consignationSaved: boolean;
    saleItems: SaleItem[];
}

const DEFAULT_PAGINATED_LIST = { items: [], totalItems: 0 };

const initialState = {
    products: DEFAULT_PAGINATED_LIST,
    productsLoaded: false,
    productsLoading: false,
    productCriteria: PRODUCT_DEFAULT_CRITERIA,
    saleSaving: false,
    saleSaved: false,
    saleSaveError: undefined,
    consignations: DEFAULT_PAGINATED_LIST,
    consignationCriteria: SALE_DEFAULT_CRITERIA,
    consignationsLoading: false,
    consignationsLoaded: false,
    saleItem: undefined,
    consignationItemLoading: false,
    consignationItemLoaded: false,
    pdfExporting: false,
    pdfExported: false,
    consignationSaving: false,
    consignationSaved: false,
    saleItems: []
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

const saveSale = (state: SaleState, action: SaveSale): SaleState => ({
    ...state,
    saleSaving: true,
    saleSaved: false,
    saleSaveError: undefined
});

const saveSaleFail = (state: SaleState, action: SaveSaleFail): SaleState => ({
    ...state,
    saleSaving: false,
    saleSaved: false,
    saleSaveError: action.payload
});

const saveSaleSuccess = (state: SaleState, action: SaveSaleSuccess): SaleState => ({
    ...state,
    saleSaving: false,
    saleSaved: true,
    saleItems: []
});

const loadConsignations = (state: SaleState, action: LoadConsignations): SaleState => ({
    ...state,
    consignationsLoading: true,
    consignationsLoaded: false,
    consignationCriteria: action.payload
});

const loadConsignationsSuccess = (
    state: SaleState,
    action: LoadConsignationsSuccess
): SaleState => ({
    ...state,
    consignationsLoading: false,
    consignationsLoaded: true,
    consignations: action.payload
});

const loadConsignationsFail = (state: SaleState, action: LoadConsignationsFail): SaleState => ({
    ...state,
    consignationsLoading: false,
    consignationsLoaded: false
});

const loadConsignationItem = (state: SaleState, action: LoadConsignationItem): SaleState => ({
    ...state,
    consignationItemLoading: true,
    consignationItemLoaded: false
});

const loadConsignationItemSuccess = (
    state: SaleState,
    action: LoadConsignationItemSuccess
): SaleState => ({
    ...state,
    consignationItemLoading: false,
    consignationItemLoaded: true,
    saleItem: action.payload
});

const loadConsignationItemFail = (
    state: SaleState,
    action: LoadConsignationItemFail
): SaleState => ({
    ...state,
    consignationItemLoading: false,
    consignationItemLoaded: false
});

const saveConsignation = (state: SaleState, action: SaveConsignation): SaleState => ({
    ...state,
    consignationSaving: true,
    consignationSaved: false
});

const saveConsignationFail = (state: SaleState, action: SaveConsignationFail): SaleState => ({
    ...state,
    consignationSaving: false,
    consignationSaved: false
});

const saveConsignationSuccess = (state: SaleState, action: SaveConsignationSuccess): SaleState => ({
    ...state,
    consignationSaving: false,
    consignationSaved: true
});

const exportPdf = (state: SaleState, action: ExportPdf): SaleState => ({
    ...state,
    pdfExporting: true,
    pdfExported: false
});

const exportPdfFail = (state: SaleState, action: ExportPdfFail): SaleState => ({
    ...state,
    pdfExporting: false,
    pdfExported: false
});

const exportPdfSuccess = (state: SaleState, action: ExportPdfSuccess): SaleState => ({
    ...state,
    pdfExporting: false,
    pdfExported: true
});

const addAsSaleItem = (state: SaleState, action: AddAsSaleItem): SaleState => ({
    ...state,
    saleItems: [
        ...state.saleItems,
        {
            ...EMPTY_SALE_ITEM,
            product: action.payload
        }
    ]
});

// tslint:disable-next-line: cyclomatic-complexity no-big-function
export function saleReducer(state: SaleState = initialState, action: SaleAction): SaleState {
    // tslint:disable-next-line: max-switch-cases
    switch (action.type) {
        case SaleActionTypes.LOAD_PRODUCTS:
            return loadProducts(state, action);
        case SaleActionTypes.LOAD_PRODUCTS_FAIL:
            return loadProductsFail(state, action);
        case SaleActionTypes.LOAD_PRODUCTS_SUCCESS:
            return loadProductsSuccess(state, action);
        case SaleActionTypes.SAVE_SALE:
            return saveSale(state, action);
        case SaleActionTypes.SAVE_SALE_SUCCESS:
            return saveSaleSuccess(state, action);
        case SaleActionTypes.SAVE_SALE_FAIL:
            return saveSaleFail(state, action);
        case SaleActionTypes.LOAD_CONSIGNATIONS:
            return loadConsignations(state, action);
        case SaleActionTypes.LOAD_CONSIGNATIONS_FAIL:
            return loadConsignationsFail(state, action);
        case SaleActionTypes.LOAD_CONSIGNATIONS_SUCCESS:
            return loadConsignationsSuccess(state, action);
        case SaleActionTypes.LOAD_CONSIGNATION_ITEM:
            return loadConsignationItem(state, action);
        case SaleActionTypes.LOAD_CONSIGNATION_ITEM_FAIL:
            return loadConsignationItemFail(state, action);
        case SaleActionTypes.LOAD_CONSIGNATION_ITEM_SUCCESS:
            return loadConsignationItemSuccess(state, action);
        case SaleActionTypes.SAVE_CONSIGNATION:
            return saveConsignation(state, action);
        case SaleActionTypes.SAVE_CONSIGNATION_FAIL:
            return saveConsignationFail(state, action);
        case SaleActionTypes.SAVE_CONSIGNATION_SUCCESS:
            return saveConsignationSuccess(state, action);
        case SaleActionTypes.EXPORT_PDF:
            return exportPdf(state, action);
        case SaleActionTypes.EXPORT_PDF_FAIL:
            return exportPdfFail(state, action);
        case SaleActionTypes.EXPORT_PDF_SUCCESS:
            return exportPdfSuccess(state, action);
        case SaleActionTypes.ADD_AS_SALE_ITEM:
            return addAsSaleItem(state, action);
        default:
            return state;
    }
}
