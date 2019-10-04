import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MasterDetailModel } from '../../types/master-detail-model.interface';

@Component({
    selector: 'app-master-detail-list',
    templateUrl: './master-detail-list.component.html',
    styleUrls: ['./master-detail-list.component.scss']
})
export class MasterDetailListComponent {
    @Input() masterDetailModels: MasterDetailModel[];
    @Input() currentMasterDetailModel: MasterDetailModel;
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Output() view: EventEmitter<MasterDetailModel> = new EventEmitter<MasterDetailModel>();
    @Output() edit: EventEmitter<MasterDetailModel> = new EventEmitter<MasterDetailModel>();
    @Output() delete: EventEmitter<MasterDetailModel> = new EventEmitter<MasterDetailModel>();
}
