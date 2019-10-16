import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ProductState } from 'src/app/product/store/reducers/product.reducers';
import {
    getProducts,
    getProductsLoading,
    getProductsTotalItems
} from 'src/app/product/store/selectors/product.selectors';
import { Product } from 'src/app/product/types/product.interface';

@Component({
    selector: 'app-sale-root',
    templateUrl: './sale-root.component.html',
    styleUrls: ['./sale-root.component.scss']
})
export class SaleRootComponent implements OnInit {
    products$: Observable<Product[]>;
    productsLoading$: Observable<boolean>;
    totalItems$: Observable<number>;

    constructor(private productStore: Store<ProductState>) {
        /** */
    }

    ngOnInit() {
        this.products$ = this.productStore.pipe(select(getProducts));
        this.productsLoading$ = this.productStore.pipe(select(getProductsLoading));
        this.totalItems$ = this.productStore.pipe(select(getProductsTotalItems));
    }
}
