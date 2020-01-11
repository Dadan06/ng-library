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
import { getErrorFrom } from 'src/app/shared/utils/error.utils';
import { subscribeModal, subscribeModalFromError } from 'src/app/shared/utils/modal.utils';
import {
    AddProduct,
    CancelSale,
    ChangeQty,
    ClearChangingQtyError,
    ClearProductAdditionError,
    DeleteSaleItem,
    SaveSale
} from '../../store/actions/sale.actions';
import { SaleState } from '../../store/reducers/sale.reducers';
import {
    getChangingQtyError,
    getOrderedSaleItems,
    getProductAdditionError,
    getProducts,
    getProductsLoading,
    getProductsTotalItems,
    getSaleCanceled,
    getSaleSaved
} from '../../store/selectors/sale.selectors';
import { ChangeQtyPayload, SaleItem } from '../../types/sale-item.interface';
import { Sale } from '../../types/sale.interface';

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
    clients$: Observable<Client[]>;

    productCriteria: ProductCriteria = cloneDeep(PRODUCT_DEFAULT_CRITERIA);
    currentSaleItem: SaleItem;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;
    @ViewChild('cancelingConfirmModal') cancelingConfirmModal: ModalComponent;
    @ViewChild('productAdditionErrorModal') productAdditionErrorModal: ModalComponent;
    @ViewChild('changingQtyErrorModal') changingQtyErrorModal: ModalComponent;
    @ViewChild('saleSaved') saleSaved: ModalComponent;
    @ViewChild('saleCanceled') saleCanceled: ModalComponent;

    constructor(private saleStore: Store<SaleState>, private sharedStore: Store<SharedState>) {
        /** */
    }

    get getAddingProductError() {
        return getErrorFrom(this.saleStore, getProductAdditionError);
    }

    get getChangingQtyError() {
        return getErrorFrom(this.saleStore, getChangingQtyError);
    }

    ngOnInit() {
        this.products$ = this.saleStore.pipe(select(getProducts));
        this.productsLoading$ = this.saleStore.pipe(select(getProductsLoading));
        this.totalItems$ = this.saleStore.pipe(select(getProductsTotalItems));
        this.saleItems$ = this.saleStore.pipe(select(getOrderedSaleItems));
        this.clients$ = this.sharedStore.pipe(select(getClients));
        this.subscribeModals();
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
        this.cancelingConfirmModal.open();
    }

    onSaveSale(sale: Partial<Sale>) {
        this.saleStore.dispatch(new SaveSale(sale));
    }

    onConfirmCanceling() {
        this.saleStore.dispatch(new CancelSale());
    }

    onCloseProductAdditionErrorModal() {
        this.saleStore.dispatch(new ClearProductAdditionError());
        this.productAdditionErrorModal.close();
    }

    onCloseChangingQtyErrorModal() {
        this.saleStore.dispatch(new ClearChangingQtyError());
        this.changingQtyErrorModal.close();
    }

    onChangeQty(changeQtyPayload: ChangeQtyPayload) {
        this.saleStore.dispatch(new ChangeQty(changeQtyPayload));
    }

    private subscribeModals() {
        subscribeModalFromError(
            this.saleStore,
            getProductAdditionError,
            this.productAdditionErrorModal
        );
        subscribeModalFromError(this.saleStore, getChangingQtyError, this.changingQtyErrorModal);
        subscribeModal(this.saleStore, getSaleSaved, true, this.saleSaved);
        subscribeModal(this.saleStore, getSaleCanceled, true, this.saleCanceled);
    }
}
