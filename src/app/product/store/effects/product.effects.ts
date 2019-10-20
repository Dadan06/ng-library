import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { PRODUCT_BASE_ROUTE } from '../../constants/product.constants';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.interface';
import {
    DeleteProduct,
    DeleteProductFail,
    DeleteProductSuccess,
    LoadAllSupplier,
    LoadAllSupplierFail,
    LoadAllSupplierSuccess,
    LoadProduct,
    LoadProductFail,
    LoadProducts,
    LoadProductsFail,
    LoadProductsSuccess,
    LoadProductSuccess,
    ProductActionTypes,
    SaveProduct,
    SaveProductFail,
    SaveProductSuccess
} from '../actions/product.actions';
import { ProductState } from '../reducers/product.reducers';
import { getProductCriteria } from '../selectors/product.selectors';

@Injectable()
export class ProductEffects {
    constructor(
        private action$: Actions,
        private productService: ProductService,
        private store: Store<ProductState>
    ) {}

    @Effect()
    loadProducts$ = this.action$.pipe(
        ofType(ProductActionTypes.LOAD_PRODUCTS),
        switchMap(
            (action: LoadProducts): Observable<Paginated<Product>> =>
                this.productService.loadProducts(action.payload)
        ),
        map((response: Paginated<Product>) => new LoadProductsSuccess(response)),
        catchError(error => of(new LoadProductsFail(error)))
    );

    @Effect()
    loadProduct$ = this.action$.pipe(
        ofType(ProductActionTypes.LOAD_PRODUCT),
        switchMap(
            (action: LoadProduct): Observable<Product> =>
                this.productService.loadProduct(action.payload)
        ),
        map((response: Product) => new LoadProductSuccess(response)),
        catchError(error => of(new LoadProductFail(error)))
    );

    @Effect()
    saveProduct$ = this.action$.pipe(
        ofType(ProductActionTypes.SAVE_PRODUCT),
        switchMap(
            (action: SaveProduct): Observable<Product> =>
                this.productService.saveProduct(action.payload)
        ),
        map((response: Product) => new SaveProductSuccess(response)),
        catchError(error => of(new SaveProductFail(error)))
    );

    @Effect()
    saveProductSuccess$ = this.action$.pipe(
        ofType(ProductActionTypes.SAVE_PRODUCT_SUCCESS),
        withLatestFrom(this.store.pipe(select(getProductCriteria))),
        map(([action, criteria]) => new LoadProducts(criteria))
    );

    @Effect()
    deleteProduct$ = this.action$.pipe(
        ofType(ProductActionTypes.DELETE_PRODUCT),
        switchMap(
            (action: DeleteProduct): Observable<void> =>
                this.productService.deleteProduct(action.payload)
        ),
        mergeMap(() => [
            new DeleteProductSuccess(),
            new Go({
                path: [`${PRODUCT_BASE_ROUTE}`]
            })
        ]),
        catchError(error => of(new DeleteProductFail(error)))
    );

    @Effect()
    deleteProductSuccess$ = this.action$.pipe(
        ofType(ProductActionTypes.DELETE_PRODUCT_SUCCESS),
        withLatestFrom(this.store.pipe(select(getProductCriteria))),
        map(([action, criteria]) => new LoadProducts(criteria))
    );

    @Effect()
    loadAllSupplier$ = this.action$.pipe(
        ofType(ProductActionTypes.LOAD_ALL_SUPPLIER),
        switchMap(
            (action: LoadAllSupplier): Observable<Supplier[]> => this.productService.loadSuppliers()
        ),
        map((response: Supplier[]) => new LoadAllSupplierSuccess(response)),
        catchError(error => of(new LoadAllSupplierFail(error)))
    );
}
