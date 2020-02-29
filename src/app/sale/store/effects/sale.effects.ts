import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getLoggedUser } from 'src/app/authentication/store/selectors/authentication.selectors';
import { Go } from 'src/app/core/store/actions/router.actions';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from 'src/app/product/types/product.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { User } from 'src/app/user/types/user.interface';
import { CONSIGNATION_BASE_ROUTE, SALE_BASE_ROUTE } from '../../constants/sale.constant';
import { SaleService } from '../../services/sale.service';
import { Payment } from '../../types/sale.interface';
import {
    ExportPdf,
    ExportPdfFail,
    ExportPdfSuccess,
    LoadConsignation,
    LoadConsignationFail,
    LoadConsignations,
    LoadConsignationsFail,
    LoadConsignationsSuccess,
    LoadConsignationSuccess,
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

@Injectable()
export class SaleEffects {
    constructor(
        private action$: Actions,
        private authenticationStore: Store<AuthenticationState>,
        private saleService: SaleService,
        private productService: ProductService
    ) {}

    @Effect()
    loadProducts$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_PRODUCTS),
        switchMap(
            (action: LoadProducts): Observable<Paginated<Product>> =>
                this.productService.loadProducts(action.payload)
        ),
        map((response: Paginated<Product>) => new LoadProductsSuccess(response)),
        catchError(error => of(new LoadProductsFail(error)))
    );

    @Effect()
    saveSale$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_SALE),
        withLatestFrom<SaveSale, User>(this.authenticationStore.pipe(select(getLoggedUser))),
        switchMap(([action, seller]) =>
            this.saleService.saveSale({ ...action.payload, seller }).pipe(
                mergeMap(response => [
                    new SaveSaleSuccess(response),
                    new Go({ path: [`${SALE_BASE_ROUTE}`] })
                ]),
                catchError(error => of(new SaveSaleFail(error)))
            )
        )
    );

    @Effect()
    loadConsignations$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_CONSIGNATIONS),
        switchMap(
            (action: LoadConsignations): Observable<Paginated<Payment>> =>
                this.saleService.loadConsignations(action.payload)
        ),
        map((response: Paginated<Payment>) => new LoadConsignationsSuccess(response)),
        catchError(error => of(new LoadConsignationsFail(error)))
    );

    @Effect()
    loadConsignation$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_CONSIGNATION),
        switchMap(
            (action: LoadConsignation): Observable<Payment> =>
                this.saleService.loadConsignation(action.payload)
        ),
        map((response: Payment) => new LoadConsignationSuccess(response)),
        catchError(error => of(new LoadConsignationFail(error)))
    );

    @Effect()
    saveConsignation$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_CONSIGNATION),
        switchMap(
            (action: SaveConsignation): Observable<Payment> =>
                this.saleService.saveConsignation(action.payload)
        ),
        mergeMap((response: Payment) => [
            new SaveConsignationSuccess(response),
            new Go({
                path: [`${CONSIGNATION_BASE_ROUTE}/detail/${response._id}`]
            })
        ]),
        catchError(error => of(new SaveConsignationFail(error)))
    );

    @Effect()
    exportPdf$ = this.action$.pipe(
        ofType(SaleActionTypes.EXPORT_PDF),
        mergeMap((action: ExportPdf) =>
            this.saleService.exportPdf(action.payload).pipe(
                map(() => new ExportPdfSuccess()),
                catchError(error => of(new ExportPdfFail(error)))
            )
        )
    );
}
