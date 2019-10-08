import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { PRODUCT_BASE_ROUTE } from '../../constants/product.constants';
import { SaveProduct } from '../../store/actions/product.actions';
import { ProductState } from '../../store/reducers/product.reducers';
import {
    getAllSupplier,
    getProduct,
    getProductEditEnabled,
    getProductEditing,
    getProductSaved
} from '../../store/selectors/product.selectors';
import { Product } from '../../types/product.interface';

@Component({
    selector: 'app-product-form-root',
    templateUrl: './product-form-root.component.html',
    styleUrls: ['./product-form-root.component.scss']
})
export class ProductFormRootComponent implements OnInit {
    product$: Observable<Product>;
    suppliers$: Observable<Supplier[]>;
    isEditing$: Observable<boolean>;
    productEditEnabled$: Observable<boolean>;

    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;

    constructor(
        private productStore: Store<ProductState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.product$ = this.productStore.pipe(select(getProduct));
        this.suppliers$ = this.productStore.pipe(select(getAllSupplier));
        this.isEditing$ = this.productStore.pipe(select(getProductEditing));
        this.productEditEnabled$ = this.authenticationStore.pipe(select(getProductEditEnabled));
        this.subscribeModals();
    }

    onEdit(product: Product) {
        go(this.productStore, [`${PRODUCT_BASE_ROUTE}/edit`, product._id]);
    }

    onSave(product: Product) {
        this.productStore.dispatch(new SaveProduct(product));
    }

    onCancelEdit(product: Product) {
        go(
            this.productStore,
            product._id ? [`${PRODUCT_BASE_ROUTE}/edit`, product._id] : [`${PRODUCT_BASE_ROUTE}`]
        );
    }

    private subscribeModals() {
        subscribeModal(this.productStore, getProductSaved, true, this.successfullSavingModal);
    }
}
