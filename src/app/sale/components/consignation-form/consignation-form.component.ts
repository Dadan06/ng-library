import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
    disableFormArray,
    enableFormArray,
    getFormArray,
    markFormArrayAsTouchedAndDirty,
    removeInFormArray
} from 'src/app/shared/utils/form.utils';
import { ConsignationStatus, SaleItem } from '../../types/sale-item.interface';
import { Consignation } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-form',
    templateUrl: './consignation-form.component.html',
    styleUrls: ['./consignation-form.component.scss']
})
export class ConsignationFormComponent implements OnChanges {
    @Input() saleItem: SaleItem;

    @Output() save: EventEmitter<SaleItem> = new EventEmitter<SaleItem>();
    @Output() edit: EventEmitter<SaleItem> = new EventEmitter<SaleItem>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;

    private formArrayName = 'consignations';

    constructor(private formBuilder: FormBuilder) {}

    ngOnChanges() {
        if (this.saleItem) {
            this.form = this.initForm(this.saleItem);
            !this.saleItem.consignations.length && this.add();
            this.saleItem.consignationStatus === ConsignationStatus.PAID && this.disableForm();
        }
    }

    getFormArray() {
        return getFormArray(this.form, this.formArrayName);
    }

    add() {
        this.getFormArray().push(this.initFormArrayItem());
    }

    removeAt(index: number) {
        removeInFormArray(this.form, this.formArrayName, index);
    }

    onSubmit() {
        this.form.valid ? this.save.emit(this.form.value) : this.showErrors();
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

    private initForm(saleItem: SaleItem) {
        return this.formBuilder.group({
            _id: [saleItem._id],
            product: [saleItem.product],
            quantity: [saleItem.quantity],
            amount: [saleItem.amount],
            consignations: this.formBuilder.array(
                saleItem.consignations.map(this.initFormArrayItem.bind(this))
            )
        });
    }

    private initFormArrayItem(consignation?: Consignation) {
        return this.formBuilder.group({
            selled: [(consignation && consignation.selled) || 0, Validators.required],
            returned: [(consignation && consignation.returned) || 0, Validators.required],
            date: [consignation ? consignation.date : new Date()]
        });
    }
}
