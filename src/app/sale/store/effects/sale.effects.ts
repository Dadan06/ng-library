import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getLoggedUser } from 'src/app/authentication/store/selectors/authentication.selectors';
import { Go } from 'src/app/core/store/actions/router.actions';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from 'src/app/product/types/product.interface';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { downloadFromUrl } from 'src/app/shared/utils/download.utils';
import { User } from 'src/app/user/types/user.interface';
import { environment } from 'src/environments/environment';
import { CONSIGNATION_BASE_ROUTE, SALE_BASE_ROUTE } from '../../constants/sale.constant';
import { SaleService } from '../../services/sale.service';
import { SaleItem } from '../../types/sale-item.interface';
import { Payment } from '../../types/sale.interface';
import {
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
    SaleActionTypes,
    SaveConsignation,
    SaveConsignationFail,
    SaveConsignationSuccess,
    SaveSale,
    SaveSaleFail,
    SaveSaleSuccess
} from '../actions/sale.actions';
import { SaleState } from '../reducers/sale.reducers';
import { getConsignationCriteria, getProductCriteria } from '../selectors/sale.selectors';

@Injectable()
export class SaleEffects {
    constructor(
        private action$: Actions,
        private authenticationStore: Store<AuthenticationState>,
        private saleService: SaleService,
        private productService: ProductService,
        private store: Store<SaleState>
    ) {}

    @Effect()
    loadProducts$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_PRODUCTS),
        switchMap((action: LoadProducts) =>
            this.productService.loadProducts(action.payload).pipe(
                map((response: Paginated<Product>) => new LoadProductsSuccess(response)),
                catchError(error => of(new LoadProductsFail(error)))
            )
        )
    );

    @Effect()
    saveSale$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_SALE),
        withLatestFrom<SaveSale, User>(this.authenticationStore.pipe(select(getLoggedUser))),
        switchMap(([action, seller]) =>
            this.saleService.saveSale({ ...action.payload, seller }).pipe(
                map(response => new SaveSaleSuccess(response)),
                catchError(error => of(new SaveSaleFail(error)))
            )
        )
    );

    @Effect()
    saveSaleSuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_SALE_SUCCESS),
        withLatestFrom<SaveSaleSuccess, ListCriteria>(this.store.pipe(select(getProductCriteria))),
        mergeMap(([action, productCriteria]) => [
            new ExportPdf(action.payload),
            new Go({ path: [`${SALE_BASE_ROUTE}`] }),
            new LoadProducts(productCriteria)
        ])
    );

    @Effect()
    loadConsignations$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_CONSIGNATIONS),
        switchMap((action: LoadConsignations) =>
            this.saleService.loadConsignations(action.payload).pipe(
                map((response: Paginated<Payment>) => new LoadConsignationsSuccess(response)),
                catchError(error => of(new LoadConsignationsFail(error)))
            )
        )
    );

    @Effect()
    loadConsignationItem$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_CONSIGNATION_ITEM),
        switchMap((action: LoadConsignationItem) =>
            this.saleService.loadConsignationItem(action.payload).pipe(
                map((response: SaleItem) => new LoadConsignationItemSuccess(response)),
                catchError(error => of(new LoadConsignationItemFail(error)))
            )
        )
    );

    @Effect()
    saveConsignation$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_CONSIGNATION),
        switchMap((action: SaveConsignation) =>
            this.saleService.saveConsignationItem(action.payload).pipe(
                mergeMap((response: SaleItem) => [
                    new SaveConsignationSuccess(response),
                    new Go({
                        path: [`${CONSIGNATION_BASE_ROUTE}/detail/${response._id}`]
                    })
                ]),
                catchError(error => of(new SaveConsignationFail(error)))
            )
        )
    );

    @Effect()
    saveConsignationSuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_CONSIGNATION_SUCCESS),
        withLatestFrom<SaveConsignationSuccess, ListCriteria>(
            this.store.pipe(select(getConsignationCriteria))
        ),
        map(([action, consignationCriteria]) => new LoadConsignations(consignationCriteria))
    );

    @Effect()
    exportPdf$ = this.action$.pipe(
        ofType(SaleActionTypes.EXPORT_PDF),
        switchMap((action: ExportPdf) =>
            this.saleService.exportPdf(action.payload).pipe(
                map((response: string) => {
                    downloadFromUrl(`${environment.mediaBaseUrl}/${response}`);
                    return new ExportPdfSuccess();
                }),
                catchError(error => of(new ExportPdfFail(error)))
            )
        )
    );
}
