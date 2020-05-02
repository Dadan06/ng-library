import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { PRODUCT_DEFAULT_CRITERIA } from 'src/app/product/constants/product.constants';
import { LoadProducts } from 'src/app/product/store/actions/product.actions';
import { Product } from 'src/app/product/types/product.interface';
import { ClientAutocompletionService } from 'src/app/shared/services/client-autocompletion.service';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { AddAsSaleItem, RemoveFromSaleItems, SaveSale } from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import {
    getPdfExporting,
    getProducts,
    getProductsLoading,
    getProductsTotalItems,
    getSaleItems,
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
    saleSaveError$: Observable<HttpErrorResponse>;

    productCriteria: ListCriteria = cloneDeep(PRODUCT_DEFAULT_CRITERIA);
    currentSaleItem: SaleItem;

    @ViewChild('saleSaved') saleSaved: ModalComponent;
    @ViewChild('saleSaveError') saleSaveError: ModalComponent;

    constructor(
        private saleStore: Store<SaleState>,
        public clientAutocompletionService: ClientAutocompletionService
    ) {
        /** */
    }

    ngOnInit() {
        this.products$ = this.saleStore.pipe(select(getProducts));
        this.productsLoading$ = this.saleStore.pipe(select(getProductsLoading));
        this.pdfExporting$ = this.saleStore.pipe(select(getPdfExporting));
        this.totalItems$ = this.saleStore.pipe(select(getProductsTotalItems));
        this.saleItems$ = this.saleStore.pipe(select(getSaleItems));
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

    onRemove(index: number) {
        this.saleStore.dispatch(new RemoveFromSaleItems(index));
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
