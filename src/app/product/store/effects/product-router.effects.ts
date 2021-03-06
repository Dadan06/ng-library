import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { PRODUCT_API_ROUTE } from '../../constants/product.constants';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.interface';
import { LoadProduct, LoadProducts, LoadProductSuccess } from '../actions/product.actions';
import { ProductState } from '../reducers/product.reducers';
import { getProductCriteria } from '../selectors/product.selectors';

@Injectable()
export class ProductRouterEffects {
    constructor(
        private action$: Actions,
        private store: Store<ProductState>,
        private productService: ProductService
    ) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    productRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${PRODUCT_API_ROUTE}`)),
        withLatestFrom(this.store.pipe(select(getProductCriteria))),
        map(([routerState, productCriteria]) => new LoadProducts(productCriteria))
    );

    @Effect()
    productFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${PRODUCT_API_ROUTE}/detail`) ||
                state.url.includes(`${PRODUCT_API_ROUTE}/edit`)
        ),
        map(routerState => new LoadProduct(routerState.params.productId))
    );

    @Effect()
    productNewRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${PRODUCT_API_ROUTE}/new`)),
        switchMap(() =>
            this.productService
                .productFactory()
                .pipe(map((response: Product) => new LoadProductSuccess(response)))
        )
    );
}
