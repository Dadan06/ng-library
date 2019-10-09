import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { Supplier } from 'src/app/supplier/types/supplier.interface';
import { ProductService } from '../../services/product.service';
import { Product } from '../../types/product.interface';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
    @Input() isEditing: boolean;
    @Input() set product(product: Product) {
        if (product) {
            this.form = this.initForm(product);
            this.isEditing ? this.form.enable() : this.form.disable();
            this.form.get('name').setAsyncValidators(this.checkDuplicate.bind(this));
            this.form.get('name').updateValueAndValidity();
            setTimeout(() => this.isEditing && this.setFocusOnFirstInput());
        }
    }
    @Input() editEnabled = true;
    @Input() suppliers: Supplier[];

    @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() save: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

    form: FormGroup;
    @ViewChild('first') firstInput: ElementRef;

    constructor(private formBuilder: FormBuilder, private productService: ProductService) {}

    onSubmit(form: FormGroup) {
        this.form.valid ? this.save.emit(form.value) : this.showErrors();
    }

    private setFocusOnFirstInput() {
        this.firstInput.nativeElement.focus();
    }

    private showErrors() {
        markFormAsTouchedAndDirty(this.form);
    }

    private initForm(product: Product): FormGroup {
        return this.formBuilder.group({
            _id: [product._id],
            name: [product.name, Validators.required],
            costPrice: [product.costPrice, Validators.required],
            sellingPrice: [product.sellingPrice, Validators.required],
            quantity: [product.quantity, Validators.required],
            supplier: [product.supplier, Validators.required]
        });
    }

    private checkDuplicate(control: AbstractControl) {
        return this.productService.checkDuplicate({ ...this.form.value, name: control.value });
    }
}
