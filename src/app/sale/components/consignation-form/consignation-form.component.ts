import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    addInFormArray,
    disableFormArray,
    enableFormArray,
    getFormArray,
    markFormArrayAsTouchedAndDirty,
    removeInFormArray,
    resetFormArrayAt
} from 'src/app/shared/utils/form.utils';
import { Consignation, Payment, Sale } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-form',
    templateUrl: './consignation-form.component.html',
    styleUrls: ['./consignation-form.component.scss']
})
export class ConsignationFormComponent implements OnChanges {
    @Input() isEditing: boolean;
    @Input() consignation: Payment;

    @Output() save: EventEmitter<Payment> = new EventEmitter();
    @Output() edit: EventEmitter<void> = new EventEmitter();
    @Output() cancel: EventEmitter<void> = new EventEmitter();

    form: FormGroup;

    private formArrayName = 'consignations';

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges() {
        if (this.consignation) {
            const sale = this.consignation.sale;
            this.form = this.initForm(sale);
            !sale.consignations.length && this.add();
            this.isEditing ? this.enableForm() : this.disableForm();
        }
    }

    getFormArray(): FormArray {
        return getFormArray(this.form, this.formArrayName);
    }

    add() {
        addInFormArray(this.form, this.initFormArrayItem(), this.formArrayName);
    }

    removeAt(index: number) {
        removeInFormArray(this.form, this.formArrayName, index);
    }

    clearAt(index: number) {
        resetFormArrayAt(this.form, this.formArrayName, index);
        getFormArray(this.form, this.formArrayName)
            .at(index)
            .patchValue({ date: new Date() });
    }

    onSubmit() {
        this.form.valid
            ? this.save.emit({
                  ...this.consignation,
                  sale: { ...this.consignation.sale, consignations: this.form.value }
              })
            : this.showErrors();
    }

    private initForm(sale: Sale) {
        return this.formBuilder.group({
            _id: [sale._id],
            consignations: this.initFormArray(sale.consignations)
        });
    }

    private initFormArray(consignations: Consignation[]) {
        return this.formBuilder.array(consignations.map(c => this.initFormArrayItem(c)));
    }

    private initFormArrayItem(consignation?: Consignation) {
        return this.formBuilder.group({
            selled: [consignation && consignation.selled, Validators.required],
            returned: [consignation && consignation.returned, Validators.required],
            date: [consignation ? consignation.date : new Date()]
        });
    }

    private showErrors() {
        markFormArrayAsTouchedAndDirty(this.formArrayName, this.form);
    }

    private enableForm() {
        enableFormArray(this.formArrayName, this.form);
    }

    private disableForm() {
        disableFormArray(this.formArrayName, this.form);
    }
}
