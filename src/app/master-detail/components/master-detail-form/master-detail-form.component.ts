import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { MasterDetailModel } from '../../types/master-detail-model.interface';

@Component({
    selector: 'app-master-detail-form',
    templateUrl: './master-detail-form.component.html',
    styleUrls: ['./master-detail-form.component.scss']
})
export class MasterDetailFormComponent {
    @Input() isEditing: boolean;
    @Input() set masterDetailModel(masterDetailModel: MasterDetailModel) {
        if (masterDetailModel) {
            this.form = this.initForm(masterDetailModel);
            this.isEditing ? this.form.enable() : this.form.disable();
            setTimeout(() => this.isEditing && this.setFocusOnFirstInput());
        }
    }
    @Input() editEnabled = true;

    @Output() edit: EventEmitter<MasterDetailModel> = new EventEmitter<MasterDetailModel>();
    @Output() save: EventEmitter<MasterDetailModel> = new EventEmitter<MasterDetailModel>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;
    @ViewChild('first') firstInput: ElementRef;

    constructor(private formBuilder: FormBuilder) {}

    onSubmit(form: FormGroup) {
        this.form.valid ? this.save.emit(form.value) : this.showErrors();
    }

    private setFocusOnFirstInput() {
        this.firstInput.nativeElement.focus();
    }

    private showErrors() {
        markFormAsTouchedAndDirty(this.form);
    }

    private initForm(masterDetailModel: MasterDetailModel): FormGroup {
        return this.formBuilder.group({
            _id: [masterDetailModel._id],
            prop1: [masterDetailModel.prop1, Validators.required],
            prop2: [masterDetailModel.prop2, Validators.required]
        });
    }
}
