import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/client/types/client.interface';
import {
    getFormArray,
    markFormArrayAsTouchedAndDirty,
    removeInFormArray
} from 'src/app/shared/utils/form.utils';
import { EMPTY_SALE } from '../../constants/sale.constant';
import { SaleItem } from '../../types/sale-item.interface';
import { Sale } from '../../types/sale.interface';

@Component({
    selector: 'app-selected-product-list',
    templateUrl: './selected-product-list.component.html',
    styleUrls: ['./selected-product-list.component.scss']
})
export class SelectedProductListComponent implements OnInit, OnChanges {
    @Input() clients: Client[];
    @Input() newLoadedSaleItem: SaleItem;

    @Output() cancel: EventEmitter<void> = new EventEmitter();
    @Output() save: EventEmitter<Sale> = new EventEmitter();

    form: FormGroup;

    formArrayName = 'saleItems';

    constructor(private formBuilder: FormBuilder) {}

    get billTotal() {
        return this.computeTotalWithoutDiscount() - this.computeDiscount();
    }

    ngOnInit() {
        this.form = this.initForm(EMPTY_SALE);
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.newLoadedSaleItem) {
            this.getFormArray().push(this.initFormArrayItem(this.newLoadedSaleItem));
            this.onFormArrayItemChange();
        }
    }

    getFormArray() {
        return getFormArray(this.form, this.formArrayName);
    }

    removeItem(index: number) {
        removeInFormArray(this.form, this.formArrayName, index);
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
            quantity: [s.quantity, Validators.required],
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
