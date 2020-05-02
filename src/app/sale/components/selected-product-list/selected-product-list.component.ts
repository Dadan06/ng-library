import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NG_SELECT_TEXT } from 'src/app/shared/constants/ngselect.constant';
import { ClientAutocompletionService } from 'src/app/shared/services/client-autocompletion.service';
import { getFormArray, markFormArrayAsTouchedAndDirty } from 'src/app/shared/utils/form.utils';
import { EMPTY_SALE } from '../../constants/sale.constant';
import { SaleItem } from '../../types/sale-item.interface';
import { Sale } from '../../types/sale.interface';

@Component({
    selector: 'app-selected-product-list',
    templateUrl: './selected-product-list.component.html',
    styleUrls: ['./selected-product-list.component.scss']
})
export class SelectedProductListComponent {
    @Input() set saleItems(values: SaleItem[]) {
        if (values) {
            this.form = this.initForm({ ...EMPTY_SALE, saleItems: values });
            this.onFormArrayItemChange();
        }
    }
    @Input() clientAutocompletionService: ClientAutocompletionService;

    @Output() save: EventEmitter<Sale> = new EventEmitter();
    @Output() remove: EventEmitter<number> = new EventEmitter();

    form: FormGroup;
    formArrayName = 'saleItems';
    notItemsFound = NG_SELECT_TEXT.NOT_ITEMS;
    loading = NG_SELECT_TEXT.LOADING;

    constructor(private formBuilder: FormBuilder) {}

    get billTotal() {
        return this.computeTotalWithoutDiscount() - this.computeDiscount();
    }

    getFormArray() {
        return getFormArray(this.form, this.formArrayName);
    }

    onSubmit() {
        this.form.valid
            ? this.save.emit({
                  ...this.form.value,
                  discount: this.computeDiscount(),
                  amount: this.billTotal
              })
            : this.showErrors();
    }

    private showErrors() {
        markFormArrayAsTouchedAndDirty(this.formArrayName, this.form);
    }

    private initForm(sale: Sale) {
        return this.formBuilder.group({
            _id: [sale._id],
            saleType: [sale.saleType],
            saleDate: [new Date()],
            client: [sale.client],
            discount: [sale.discount],
            amount: [sale.amount],
            saleItems: this.formBuilder.array(sale.saleItems.map(this.initFormArrayItem.bind(this)))
        });
    }

    private initFormArrayItem(s: SaleItem) {
        return this.formBuilder.group({
            product: [s.product],
            quantity: [s.quantity, [Validators.required, Validators.min(1)]],
            amount: [s.amount]
        });
    }

    private onFormArrayItemChange() {
        this.getFormArray().controls.forEach(control => {
            control.get('quantity').valueChanges.subscribe(value => {
                const amount = control.get('product').value.sellingPrice * value;
                control.patchValue({ amount });
            });
        });
    }

    private computeTotalWithoutDiscount() {
        return this.getFormArray().controls.reduce(
            (acc, current) => acc + +current.get('amount').value,
            0
        );
    }

    private computeDiscount() {
        return (this.computeTotalWithoutDiscount() * this.form.get('discount').value) / 100;
    }
}
