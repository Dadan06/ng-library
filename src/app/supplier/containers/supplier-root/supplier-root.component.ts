import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { SUPPLIER_BASE_ROUTE, SUPPLIER_DEFAULT_CRITERIA } from '../../constants/supplier.constants';
import { DeleteSupplier, LoadSuppliers } from '../../store/actions/supplier.actions';
import { SupplierState } from '../../store/reducers/supplier.reducers';
import {
    getIsEditingOrDetail,
    getSupplier,
    getSupplierCreateEnabled,
    getSupplierDeleteEnabled,
    getSupplierEditEnabled,
    getSuppliers,
    getSupplierSaved,
    getSuppliersLoading,
    getSuppliersTotalItems
} from '../../store/selectors/supplier.selectors';
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
    isEditingOrDetail$: Observable<boolean>;
    totalItems$: Observable<number>;
    currentSupplier$: Observable<Supplier>;
    supplierCriteria: ListCriteria = cloneDeep(SUPPLIER_DEFAULT_CRITERIA);
    toBeDeletedSupplier: Supplier;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;
    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;

    constructor(
        private supplierStore: Store<SupplierState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.suppliers$ = this.supplierStore.pipe(select(getSuppliers));
        this.suppliersLoading$ = this.supplierStore.pipe(select(getSuppliersLoading));
        this.totalItems$ = this.supplierStore.pipe(select(getSuppliersTotalItems));
        this.isEditingOrDetail$ = this.supplierStore.pipe(select(getIsEditingOrDetail));
        this.supplierEditEnabled$ = this.authenticationStore.pipe(select(getSupplierEditEnabled));
        this.supplierDeleteEnabled$ = this.authenticationStore.pipe(
            select(getSupplierDeleteEnabled)
        );
        this.supplierCreateEnabled$ = this.authenticationStore.pipe(
            select(getSupplierCreateEnabled)
        );
        this.currentSupplier$ = this.supplierStore.pipe(select(getSupplier));
        this.subscribeModals();
    }

    onSort(sort: Sort) {
        this.supplierCriteria.sort = sort;
        this.refreshList();
    }

    onSearch(search: string) {
        this.supplierCriteria.search = search;
        this.refreshList();
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
        this.refreshList();
    }

    onCreate() {
        go(this.supplierStore, [`${SUPPLIER_BASE_ROUTE}/new`]);
    }

    onConfirmDeletion() {
        this.supplierStore.dispatch(new DeleteSupplier(this.toBeDeletedSupplier));
    }

    private subscribeModals() {
        subscribeModal(this.supplierStore, getSupplierSaved, true, this.successfullSavingModal);
    }

    private refreshList() {
        this.supplierStore.dispatch(new LoadSuppliers({ ...this.supplierCriteria }));
    }
}
