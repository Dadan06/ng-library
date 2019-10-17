import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { PRODUCT_DEFAULT_CRITERIA } from 'src/app/product/constants/product.constants';
import { LoadProducts } from 'src/app/product/store/actions/product.actions';
import { ProductState } from 'src/app/product/store/reducers/product.reducers';
import {
    getProducts,
    getProductsLoading,
    getProductsTotalItems
} from 'src/app/product/store/selectors/product.selectors';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { Page } from 'src/app/shared/types/page.interface';

@Component({
    selector: 'app-sale-root',
    templateUrl: './sale-root.component.html',
    styleUrls: ['./sale-root.component.scss']
})
export class SaleRootComponent implements OnInit {
    products$: Observable<Product[]>;
    productsLoading$: Observable<boolean>;
    totalItems$: Observable<number>;
    productCriteria: ProductCriteria = cloneDeep(PRODUCT_DEFAULT_CRITERIA);

    constructor(private productStore: Store<ProductState>) {
        /** */
    }

    ngOnInit() {
        this.products$ = this.productStore.pipe(select(getProducts));
        this.productsLoading$ = this.productStore.pipe(select(getProductsLoading));
        this.totalItems$ = this.productStore.pipe(select(getProductsTotalItems));
    }

    onSearch(search: string) {
        this.productCriteria.search = search;
        this.productStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }

    onPaginate(page: Page) {
        this.productCriteria.page = page;
        this.productStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }
}
