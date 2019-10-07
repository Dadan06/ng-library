import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { SUPPLIER_BASE_ROUTE } from '../../constants/supplier.constants';
import { SaveSupplier } from '../../store/actions/supplier.actions';
import { SupplierState } from '../../store/reducers/supplier.reducers';
import {
    getSupplier,
    getSupplierEditEnabled,
    getSupplierEditing,
    getSupplierSaved
} from '../../store/selectors/supplier.selectors';
import { Supplier } from '../../types/supplier.interface';

@Component({
    selector: 'app-supplier-form-root',
    templateUrl: './supplier-form-root.component.html',
    styleUrls: ['./supplier-form-root.component.scss']
})
export class SupplierFormRootComponent implements OnInit {
    supplier$: Observable<Supplier>;
    isEditing$: Observable<boolean>;
    supplierEditEnabled$: Observable<boolean>;

    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;

    constructor(
        private supplierStore: Store<SupplierState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.supplier$ = this.supplierStore.pipe(select(getSupplier));
        this.isEditing$ = this.supplierStore.pipe(select(getSupplierEditing));
        this.supplierEditEnabled$ = this.authenticationStore.pipe(select(getSupplierEditEnabled));
        this.subscribeModals();
    }

    onEdit(supplier: Supplier) {
        go(this.supplierStore, [`${SUPPLIER_BASE_ROUTE}/edit`, supplier._id]);
    }

    onSave(supplier: Supplier) {
        this.supplierStore.dispatch(new SaveSupplier(supplier));
    }

    onCancelEdit(supplier: Supplier) {
        go(
            this.supplierStore,
            supplier._id
                ? [`${SUPPLIER_BASE_ROUTE}/edit`, supplier._id]
                : [`${SUPPLIER_BASE_ROUTE}`]
        );
    }

    private subscribeModals() {
        subscribeModal(this.supplierStore, getSupplierSaved, true, this.successfullSavingModal);
    }
}
