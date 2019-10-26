import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { Page } from 'src/app/shared/types/page.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { SUPPLIER_BASE_ROUTE, SUPPLIER_DEFAULT_CRITERIA } from '../../constants/supplier.constants';
import { DeleteSupplier, LoadSuppliers } from '../../store/actions/supplier.actions';
import { SupplierState } from '../../store/reducers/supplier.reducers';
import {
    getSupplier,
    getSupplierCreateEnabled,
    getSupplierDeleteEnabled,
    getSupplierEditEnabled,
    getSuppliers,
    getSuppliersLoading,
    getSuppliersTotalItems
} from '../../store/selectors/supplier.selectors';
import { SupplierCriteria } from '../../types/supplier-criteria.interface';
import { Supplier } from '../../types/supplier.interface';

@Component({
    selector: 'app-supplier-root',
    templateUrl: './supplier-root.component.html',
    styleUrls: ['./supplier-root.component.scss']
})
export class SupplierRootComponent implements OnInit {
    suppliers$: Observable<Supplier[]>;
    suppliersLoading$: Observable<boolean>;
    supplierEditEnabled$: Observable<boolean>;
    supplierDeleteEnabled$: Observable<boolean>;
    supplierCreateEnabled$: Observable<boolean>;
    totalItems$: Observable<number>;
    currentSupplier$: Observable<Supplier>;
    supplierCriteria: SupplierCriteria = cloneDeep(SUPPLIER_DEFAULT_CRITERIA);
    toBeDeletedSupplier: Supplier;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;

    constructor(
        private supplierStore: Store<SupplierState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.suppliers$ = this.supplierStore.pipe(select(getSuppliers));
        this.suppliersLoading$ = this.supplierStore.pipe(select(getSuppliersLoading));
        this.totalItems$ = this.supplierStore.pipe(select(getSuppliersTotalItems));
        this.supplierEditEnabled$ = this.authenticationStore.pipe(select(getSupplierEditEnabled));
        this.supplierDeleteEnabled$ = this.authenticationStore.pipe(
            select(getSupplierDeleteEnabled)
        );
        this.supplierCreateEnabled$ = this.authenticationStore.pipe(
            select(getSupplierCreateEnabled)
        );
        this.currentSupplier$ = this.supplierStore.pipe(select(getSupplier));
    }

    onSearch(search: string) {
        this.supplierCriteria.search = search;
        this.supplierStore.dispatch(new LoadSuppliers({ ...this.supplierCriteria }));
    }

    onViewDetail(supplier: Supplier) {
        go(this.supplierStore, [`${SUPPLIER_BASE_ROUTE}/detail`, supplier._id]);
    }

    onEdit(supplier: Supplier) {
        go(this.supplierStore, [`${SUPPLIER_BASE_ROUTE}/edit`, supplier._id]);
    }

    onDelete(supplier: Supplier) {
        this.toBeDeletedSupplier = supplier;
        this.deletionConfirmModal.open();
    }

    onPaginate(page: Page) {
        this.supplierCriteria.page = page;
        this.supplierStore.dispatch(new LoadSuppliers({ ...this.supplierCriteria }));
    }

    onCreate() {
        go(this.supplierStore, [`${SUPPLIER_BASE_ROUTE}/new`]);
    }

    onConfirmDeletion() {
        this.supplierStore.dispatch(new DeleteSupplier(this.toBeDeletedSupplier));
    }
}
