import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getLoggedUser } from 'src/app/authentication/store/selectors/authentication.selectors';
import { Go } from 'src/app/core/store/actions/router.actions';
import { ProductService } from 'src/app/product/services/product.service';
import { Product } from 'src/app/product/types/product.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { User } from 'src/app/user/types/user.interface';
import { SALE_BASE_ROUTE } from '../../constants/sale.constant';
import { SaleService } from '../../services/sale.service';
import { SaleItem } from '../../types/sale-item.interface';
import { Sale } from '../../types/sale.interface';
import {
    AddProduct,
    AddProductFail,
    AddProductSuccess,
    CancelSale,
    CancelSaleFail,
    CancelSaleSuccess,
    ChangeQty,
    ChangeQtyFail,
    ChangeQtySuccess,
    ClearSale,
    DeleteSaleItem,
    DeleteSaleItemFail,
    DeleteSaleItemSuccess,
    LoadConsignations,
    LoadConsignationsFail,
    LoadConsignationsSuccess,
    LoadProducts,
    LoadProductsFail,
    LoadProductsSuccess,
    NewSale,
    SaleActionTypes,
    SaveSale,
    SaveSaleFail,
    SaveSaleSuccess
} from '../actions/sale.actions';
import { SaleState } from '../reducers/sale.reducers';
import { getOrderedSaleItems, getProductCriteria, getSale } from '../selectors/sale.selectors';

@Injectable()
export class SaleEffects {
    constructor(
        private action$: Actions,
        private saleStore: Store<SaleState>,
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
    addProduct$ = this.action$.pipe(
        ofType(SaleActionTypes.ADD_PRODUCT),
        map(action => action),
        withLatestFrom<AddProduct, Sale, User>(
            this.saleStore.pipe(select(getSale)),
            this.authenticationStore.pipe(select(getLoggedUser))
        ),
        switchMap(([action, sale, user]) =>
            forkJoin([of(action), sale._id ? of(sale) : this.saleService.createSale(user)])
        ),
        switchMap(([action, sale]) =>
            this.saleService.addProduct(sale._id, action.payload).pipe(
                mergeMap((response: SaleItem) => [
                    new NewSale(sale),
                    new AddProductSuccess(response)
                ]),
                catchError(error => of(new AddProductFail(error)))
            )
        )
    );

    @Effect()
    addSaleItemSuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.ADD_PRODUCT_SUCCESS),
        withLatestFrom(this.saleStore.pipe(select(getProductCriteria))),
        map(([action, criteria]) => new LoadProducts({ ...criteria }))
    );

    @Effect()
    deleteSaleItem$ = this.action$.pipe(
        ofType(SaleActionTypes.DELETE_SALE_ITEM),
        mergeMap((action: DeleteSaleItem) =>
            this.saleService.deleteSaleItem(action.payload).pipe(
                map((response: SaleItem) => new DeleteSaleItemSuccess(response)),
                catchError(error => of(new DeleteSaleItemFail(error)))
            )
        )
    );

    @Effect()
    deleteSaleItemSuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.DELETE_SALE_ITEM_SUCCESS),
        withLatestFrom(this.saleStore.pipe(select(getProductCriteria))),
        map(([action, criteria]) => new LoadProducts({ ...criteria }))
    );

    @Effect()
    cancelSale$ = this.action$.pipe(
        ofType(SaleActionTypes.CANCEL_SALE),
        withLatestFrom<CancelSale, Sale>(this.saleStore.pipe(select(getSale))),
        mergeMap(([action, sale]) =>
            this.saleService.cancelSale(sale._id).pipe(
                mergeMap(() => [new CancelSaleSuccess(), new Go({ path: [`${SALE_BASE_ROUTE}`] })]),
                catchError(error => of(new CancelSaleFail(error)))
            )
        )
    );

    @Effect()
    cancelSaleSuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.CANCEL_SALE_SUCCESS),
        withLatestFrom(this.saleStore.pipe(select(getProductCriteria))),
        mergeMap(([action, criteria]) => [new LoadProducts({ ...criteria }), new ClearSale()])
    );

    @Effect()
    changeQty$ = this.action$.pipe(
        ofType(SaleActionTypes.CHANGE_QTY),
        mergeMap((action: ChangeQty) =>
            this.saleService.changeQty(action.payload).pipe(
                map((response: SaleItem) => new ChangeQtySuccess(response)),
                catchError(error => of(new ChangeQtyFail(error)))
            )
        )
    );

    @Effect()
    changeQtySuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.CHANGE_QTY_SUCCESS),
        withLatestFrom(this.saleStore.pipe(select(getProductCriteria))),
        map(([action, criteria]) => new LoadProducts({ ...criteria }))
    );

    @Effect()
    saveSale$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_SALE),
        withLatestFrom<SaveSale, Sale, SaleItem[]>(
            this.saleStore.pipe(select(getSale)),
            this.saleStore.pipe(select(getOrderedSaleItems))
        ),
        mergeMap(([action, sale, saleItems]) =>
            this.saleService.saveSale({ ...sale, ...action.payload, saleItems }).pipe(
                mergeMap(() => [new SaveSaleSuccess(), new Go({ path: [`${SALE_BASE_ROUTE}`] })]),
                catchError(error => of(new SaveSaleFail(error)))
            )
        )
    );

    @Effect()
    saveSaleSuccess$ = this.action$.pipe(
        ofType(SaleActionTypes.SAVE_SALE_SUCCESS),
        withLatestFrom(this.saleStore.pipe(select(getProductCriteria))),
        mergeMap(([action, criteria]) => [new LoadProducts({ ...criteria }), new ClearSale()])
    );

    @Effect()
    loadConsignations$ = this.action$.pipe(
        ofType(SaleActionTypes.LOAD_CONSIGNATIONS),
        switchMap(
            (action: LoadConsignations): Observable<Sale[]> => this.saleService.loadConsignations()
        ),
        map((response: Sale[]) => new LoadConsignationsSuccess(response)),
        catchError(error => of(new LoadConsignationsFail(error)))
    );
}
