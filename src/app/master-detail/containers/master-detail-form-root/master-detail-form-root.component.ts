import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { MasterDetailModel } from '../../types/master-detail-model.interface';
import { Go } from '../../../core/store/actions/router.actions';
import { SaveMasterDetailModel } from '../../store/actions/master-detail.actions';
import { MasterDetailState } from '../../store/reducers/master-detail.reducers';
import {
    getMasterDetailModel,
    getMasterDetailModelEditEnabled,
    getMasterDetailModelEditing,
    getMasterDetailModelSaved
} from '../../store/selectors/master-detail.selectors';
import { MASTER_DETAIL_BASE_ROUTE } from '../../constants/master-detail.constants';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';

@Component({
    selector: 'app-master-detail-form-root',
    templateUrl: './master-detail-form-root.component.html',
    styleUrls: ['./master-detail-form-root.component.scss']
})
export class MasterDetailFormRootComponent implements OnInit {
    masterDetailModel$: Observable<MasterDetailModel>;
    isEditing$: Observable<boolean>;
    masterDetailModelEditEnabled$: Observable<boolean>;

    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;

    constructor(
        private masterDetailStore: Store<MasterDetailState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.masterDetailModel$ = this.masterDetailStore.pipe(select(getMasterDetailModel));
        this.isEditing$ = this.masterDetailStore.pipe(select(getMasterDetailModelEditing));
        this.masterDetailModelEditEnabled$ = this.authenticationStore.pipe(select(getMasterDetailModelEditEnabled));
        this.subscribeModals();
    }

    onEdit(masterDetailModel: MasterDetailModel) {
        this.go([`${MASTER_DETAIL_BASE_ROUTE}/edit`, masterDetailModel._id]);
    }

    onSave(masterDetailModel: MasterDetailModel) {
        this.masterDetailStore.dispatch(new SaveMasterDetailModel(masterDetailModel));
    }

    onCancelEdit(masterDetailModel: MasterDetailModel) {
        this.go(
            masterDetailModel._id ?
            [`${MASTER_DETAIL_BASE_ROUTE}/edit`, masterDetailModel._id] :
            [`${MASTER_DETAIL_BASE_ROUTE}`]
        );
    }

    private subscribeModals() {
        subscribeModal(this.masterDetailStore, getMasterDetailModelSaved, true, this.successfullSavingModal);
    }

    private go(path: string[]) {
        this.masterDetailStore.dispatch(new Go({ path }));
    }
}
