import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { Supplier } from '../../types/supplier.interface';

@Component({
    selector: 'app-supplier-form',
    templateUrl: './supplier-form.component.html',
    styleUrls: ['./supplier-form.component.scss']
})
export class SupplierFormComponent {
    @Input() isEditing: boolean;
    @Input() set supplier(supplier: Supplier) {
        if (supplier) {
            this.form = this.initForm(supplier);
            this.isEditing ? this.form.enable() : this.form.disable();
            setTimeout(() => this.isEditing && this.setFocusOnFirstInput());
        }
    }
    @Input() editEnabled = true;

    @Output() edit: EventEmitter<Supplier> = new EventEmitter<Supplier>();
    @Output() save: EventEmitter<Supplier> = new EventEmitter<Supplier>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

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

    private initForm(supplier: Supplier): FormGroup {
        return this.formBuilder.group({
            _id: [supplier._id],
            name: [supplier.name, Validators.required],
            address: [supplier.address, Validators.required],
            contact: [supplier.contact, Validators.required],
            nif: [supplier.nif],
            stat: [supplier.stat],
            cin: [supplier.cin]
        });
    }
}
