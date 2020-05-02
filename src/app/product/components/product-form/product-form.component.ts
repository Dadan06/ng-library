import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NG_SELECT_TEXT } from 'src/app/shared/constants/ngselect.constant';
import { SupplierAutocompletionService } from 'src/app/shared/services/supplier-autocompletion.service';
import { markFormAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
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
    @Input() supplierAutocompletionService: SupplierAutocompletionService;

    @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() save: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() cancel: EventEmitter<void> = new EventEmitter<void>();
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    @ViewChild('first') firstInput: ElementRef;

    form: FormGroup;
    notItemsFound = NG_SELECT_TEXT.NOT_ITEMS;
    loading = NG_SELECT_TEXT.LOADING;

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
            type: [product.type, Validators.required],
            supplier: [product.supplier, Validators.required]
        });
    }

    private checkDuplicate(control: AbstractControl) {
        return this.productService.checkDuplicate({ ...this.form.value, name: control.value });
    }
}
