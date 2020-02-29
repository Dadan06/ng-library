import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { Client } from 'src/app/client/types/client.interface';
import { PRODUCT_DEFAULT_CRITERIA } from 'src/app/product/constants/product.constants';
import { LoadProducts } from 'src/app/product/store/actions/product.actions';
import { ProductCriteria } from 'src/app/product/types/product-criteria.interface';
import { Product } from 'src/app/product/types/product.interface';
import { SharedState } from 'src/app/shared/store/reducers/shared.reducers';
import { getClients } from 'src/app/shared/store/selectors/shared.selectors';
import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { AddAsSaleItem, SaveSale } from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import {
    getNewAddedSaleItem,
    getPdfExporting,
    getProducts,
    getProductsLoading,
    getProductsTotalItems,
    getSaleSaved,
    getSaleSaveError,
    getSaleSaveFail
} from '../../store/selectors/sale.selectors';
import { SaleItem } from '../../types/sale-item.interface';
import { Sale } from '../../types/sale.interface';

@Component({
    selector: 'app-sale-root',
    templateUrl: './sale-root.component.html',
    styleUrls: ['./sale-root.component.scss']
})
export class SaleRootComponent implements OnInit {
    products$: Observable<Product[]>;
    productsLoading$: Observable<boolean>;
    pdfExporting$: Observable<boolean>;
    totalItems$: Observable<number>;
    saleItems$: Observable<SaleItem[]>;
    clients$: Observable<Client[]>;
    newAddedSaleItem$: Observable<SaleItem>;
    saleSaveError$: Observable<HttpErrorResponse>;

    productCriteria: ProductCriteria = cloneDeep(PRODUCT_DEFAULT_CRITERIA);
    currentSaleItem: SaleItem;

    @ViewChild('saleSaved') saleSaved: ModalComponent;
    @ViewChild('saleSaveError') saleSaveError: ModalComponent;

    constructor(private saleStore: Store<SaleState>, private sharedStore: Store<SharedState>) {
        /** */
    }

    ngOnInit() {
        this.products$ = this.saleStore.pipe(select(getProducts));
        this.productsLoading$ = this.saleStore.pipe(select(getProductsLoading));
        this.pdfExporting$ = this.saleStore.pipe(select(getPdfExporting));
        this.totalItems$ = this.saleStore.pipe(select(getProductsTotalItems));
        this.clients$ = this.sharedStore.pipe(select(getClients));
        this.newAddedSaleItem$ = this.saleStore.pipe(select(getNewAddedSaleItem));
        this.saleSaveError$ = this.saleStore.pipe(select(getSaleSaveError));
        this.subscribeModals();
    }

    onSort(sort: Sort) {
        this.productCriteria.sort = sort;
        this.refreshList();
    }

    onSearch(search: string) {
        this.productCriteria.search = search;
        this.refreshList();
    }

    onPaginate(page: Page) {
        this.productCriteria.page = page;
        this.refreshList();
    }

    onSave(sale: Sale) {
        this.saleStore.dispatch(new SaveSale(sale));
    }

    onAddProduct(product: Product) {
        this.saleStore.dispatch(new AddAsSaleItem(product));
    }

    private subscribeModals() {
        subscribeModal(this.saleStore, getSaleSaved, true, this.saleSaved);
        subscribeModal(this.saleStore, getSaleSaveFail, true, this.saleSaveError);
    }

    private refreshList() {
        this.saleStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }
}
