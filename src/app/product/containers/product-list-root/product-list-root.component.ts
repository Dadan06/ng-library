import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { Page } from 'src/app/shared/types/page.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { PRODUCT_BASE_ROUTE, PRODUCT_DEFAULT_CRITERIA } from '../../constants/product.constants';
import { DeleteProduct, LoadProducts } from '../../store/actions/product.actions';
import { ProductState } from '../../store/reducers/product.reducers';
import {
    getIsEditingOrDetail,
    getProduct,
    getProductCreateEnabled,
    getProductDeleteEnabled,
    getProductEditEnabled,
    getProducts,
    getProductSaved,
    getProductsLoading,
    getProductsTotalItems
} from '../../store/selectors/product.selectors';
import { ProductCriteria } from '../../types/product-criteria.interface';
import { Product } from '../../types/product.interface';

@Component({
    selector: 'app-product-list-root',
    templateUrl: './product-list-root.component.html',
    styleUrls: ['./product-list-root.component.scss']
})
export class ProductListRootComponent implements OnInit {
    products$: Observable<Product[]>;
    productsLoading$: Observable<boolean>;
    productEditEnabled$: Observable<boolean>;
    productDeleteEnabled$: Observable<boolean>;
    productCreateEnabled$: Observable<boolean>;
    isEditingOrDetail$: Observable<boolean>;
    totalItems$: Observable<number>;
    currentProduct$: Observable<Product>;
    productCriteria: ProductCriteria = cloneDeep(PRODUCT_DEFAULT_CRITERIA);
    toBeDeletedProduct: Product;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;
    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;

    constructor(
        private productStore: Store<ProductState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.products$ = this.productStore.pipe(select(getProducts));
        this.productsLoading$ = this.productStore.pipe(select(getProductsLoading));
        this.totalItems$ = this.productStore.pipe(select(getProductsTotalItems));
        this.productEditEnabled$ = this.authenticationStore.pipe(select(getProductEditEnabled));
        this.isEditingOrDetail$ = this.productStore.pipe(select(getIsEditingOrDetail));
        this.productDeleteEnabled$ = this.authenticationStore.pipe(select(getProductDeleteEnabled));
        this.productCreateEnabled$ = this.authenticationStore.pipe(select(getProductCreateEnabled));
        this.currentProduct$ = this.productStore.pipe(select(getProduct));
        this.subscribeModals();
    }

    onSearch(search: string) {
        this.productCriteria.search = search;
        this.productStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }

    onViewDetail(product: Product) {
        go(this.productStore, [`${PRODUCT_BASE_ROUTE}/detail`, product._id]);
    }

    onEdit(product: Product) {
        go(this.productStore, [`${PRODUCT_BASE_ROUTE}/edit`, product._id]);
    }

    onDelete(product: Product) {
        this.toBeDeletedProduct = product;
        this.deletionConfirmModal.open();
    }

    onPaginate(page: Page) {
        this.productCriteria.page = page;
        this.productStore.dispatch(new LoadProducts({ ...this.productCriteria }));
    }

    onCreate() {
        go(this.productStore, [`${PRODUCT_BASE_ROUTE}/new`]);
    }

    onConfirmDeletion() {
        this.productStore.dispatch(new DeleteProduct(this.toBeDeletedProduct));
    }

    private subscribeModals() {
        subscribeModal(this.productStore, getProductSaved, true, this.successfullSavingModal);
    }
}
