import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { PRODUCT_DEFAULT_CRITERIA } from 'src/app/product/constants/product.constants';
import { LoadProducts } from 'src/app/product/store/actions/product.actions';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { AddProduct, CancelSale, DeleteSaleItem } from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import {
    getOrderedSaleItems,
    getProducts,
    getProductsLoading,
    getProductsTotalItems
} from '../../store/selectors/sale.selectors';
import { SaleItem } from '../../types/sale-item.interface';

@Component({
    selector: 'app-sale-root',
    templateUrl: './sale-root.component.html',
    styleUrls: ['./sale-root.component.scss']
})
export class SaleRootComponent implements OnInit {
    products$: Observable<Product[]>;
    productsLoading$: Observable<boolean>;
    totalItems$: Observable<number>;
    saleItems$: Observable<SaleItem[]>;

    productCriteria: ProductCriteria = cloneDeep(PRODUCT_DEFAULT_CRITERIA);
    currentSaleItem: SaleItem;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;
    @ViewChild('cancelingConfirmModal') cancelingConfirmModal: ModalComponent;

    constructor(private saleStore: Store<SaleState>) {
        /** */
    }

    ngOnInit() {
        this.products$ = this.saleStore.pipe(select(getProducts));
        this.productsLoading$ = this.saleStore.pipe(select(getProductsLoading));
        this.totalItems$ = this.saleStore.pipe(select(getProductsTotalItems));
        this.saleItems$ = this.saleStore.pipe(select(getOrderedSaleItems));
    }

    onSearch(search: string) {
        this.productCriteria.search = search;
        this.saleStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }

    onPaginate(page: Page) {
        this.productCriteria.page = page;
        this.saleStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }

    onAddProduct(product: Product) {
        this.saleStore.dispatch(new AddProduct(product));
    }

    onConfirmDeletion() {
        this.saleStore.dispatch(new DeleteSaleItem(this.currentSaleItem));
    }

    onCancelSale() {
        this.saleStore.dispatch(new CancelSale());
    }
}
