import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { MasterDetailModel } from '../../types/master-detail-model.interface';
import {
    MASTER_DETAIL_BASE_ROUTE,
    MASTER_DETAIL_DEFAULT_CRITERIA
} from '../../constants/master-detail.constants';
import { Page } from 'src/app/shared/types/page.interface';
import { Go } from '../../../core/store/actions/router.actions';
import { DeleteMasterDetailModel, LoadMasterDetailModels } from '../../store/actions/master-detail.actions';
import { MasterDetailState } from '../../store/reducers/master-detail.reducers';
import {
    getMasterDetailModel,
    getMasterDetailModelCreateEnabled,
    getMasterDetailModelDeleteEnabled,
    getMasterDetailModelEditEnabled,
    getMasterDetailModels,
    getMasterDetailModelsLoading,
    getMasterDetailModelsTotalItems
} from '../../store/selectors/master-detail.selectors';
import { MasterDetailCriteria } from '../../types/master-detail-criteria.interface';

@Component({
    selector: 'app-master-detail-root',
    templateUrl: './master-detail-root.component.html',
    styleUrls: ['./master-detail-root.component.scss']
})
export class MasterDetailRootComponent implements OnInit {
    masterDetailModels$: Observable<MasterDetailModel[]>;
    masterDetailModelsLoading$: Observable<boolean>;
    masterDetailModelEditEnabled$: Observable<boolean>;
    masterDetailModelDeleteEnabled$: Observable<boolean>;
    masterDetailModelCreateEnabled$: Observable<boolean>;
    totalItems$: Observable<number>;
    currentMasterDetailModel$: Observable<MasterDetailModel>;
    masterDetailCriteria: MasterDetailCriteria = cloneDeep(MASTER_DETAIL_DEFAULT_CRITERIA);
    toBeDeletedMasterDetailModel: MasterDetailModel;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;

    constructor(
        private masterDetailStore: Store<MasterDetailState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.masterDetailModels$ = this.masterDetailStore.pipe(select(getMasterDetailModels));
        this.masterDetailModelsLoading$ = this.masterDetailStore.pipe(select(getMasterDetailModelsLoading));
        this.totalItems$ = this.masterDetailStore.pipe(select(getMasterDetailModelsTotalItems));
        this.masterDetailModelEditEnabled$ = this.authenticationStore.pipe(select(getMasterDetailModelEditEnabled));
        this.masterDetailModelDeleteEnabled$ = this.authenticationStore.pipe(
            select(getMasterDetailModelDeleteEnabled)
        );
        this.masterDetailModelCreateEnabled$ = this.authenticationStore.pipe(
            select(getMasterDetailModelCreateEnabled)
        );
        this.currentMasterDetailModel$ = this.masterDetailStore.pipe(select(getMasterDetailModel));
    }

    onSearch(search: string) {
        this.masterDetailCriteria.search = search;
        this.masterDetailStore.dispatch(new LoadMasterDetailModels({ ...this.masterDetailCriteria }));
    }

    onViewDetail(masterDetailModel: MasterDetailModel) {
        this.masterDetailStore.dispatch(
            new Go({
                path: ['/root/home/master-detail/detail', masterDetailModel._id]
            })
        );
    }

    // tslint:disable-next-line: no-identical-functions
    onEdit(masterDetailModel: MasterDetailModel) {
        this.go([`${MASTER_DETAIL_BASE_ROUTE}/edit`, masterDetailModel._id]);
    }

    onDelete(masterDetailModel: MasterDetailModel) {
        this.toBeDeletedMasterDetailModel = masterDetailModel;
        this.deletionConfirmModal.open();
    }

    onPaginate(page: Page) {
        this.masterDetailCriteria.page = page;
        this.masterDetailStore.dispatch(new LoadMasterDetailModels({ ...this.masterDetailCriteria }));
    }

    onCreate() {
        this.go([`${MASTER_DETAIL_BASE_ROUTE}/new`]);
    }

    onConfirmDeletion() {
        this.masterDetailStore.dispatch(new DeleteMasterDetailModel(this.toBeDeletedMasterDetailModel));
    }

    private go(path: string[]) {
        this.masterDetailStore.dispatch(new Go({ path }));
    }
}
