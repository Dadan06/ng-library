import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/client/types/client.interface';
import { QuantityChangingData, SaleItem, SaleItemStatus } from '../../types/sale-item.interface';
import { Sale, SaleType } from '../../types/sale.interface';

@Component({
    selector: 'app-selected-product-list',
    templateUrl: './selected-product-list.component.html',
    styleUrls: ['./selected-product-list.component.scss']
})
export class SelectedProductListComponent implements OnInit {
    @Input() clients: Client[];
    @Input() saleItems: SaleItem[];

    @Output() delete: EventEmitter<SaleItem> = new EventEmitter();
    @Output() cancel: EventEmitter<void> = new EventEmitter();
    @Output() save: EventEmitter<Partial<Sale>> = new EventEmitter();
    @Output() changeQty: EventEmitter<QuantityChangingData> = new EventEmitter();

    currentValues = [1];

    saleType: SaleType;
    client: Client;
    discount: number;

    private digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    private notDigits = ['Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    constructor() {
        /** */
    }

    ngOnInit() {
        this.init();
    }

    get billTotal() {
        const validSaleItems = this.saleItems.filter(s => s.status === SaleItemStatus.ORDERED);
        return validSaleItems.reduce(
            (m: number, s: SaleItem) => m + s.quantity * s.product.sellingPrice,
            0
        );
    }

    get computedDiscount() {
        return (this.billTotal * this.discount || 0) / 100;
    }

    get saleItemsLength() {
        return this.saleItems.length;
    }

    get editedQuantity() {
        return this.normalizeValue();
    }

    onEditQty(saleItem: SaleItem, event: KeyboardEvent) {
        let previousValue = 0;
        if (this.digits.indexOf(event.key) > -1) {
            this.currentValues.push(+event.key);
        }
        if (event.key === 'Backspace') {
            previousValue = this.normalizeValue();
            this.currentValues.pop();
        }
        if (this.notDigits.indexOf(event.key) === -1) {
            this.changeQty.emit({
                saleItem: { ...saleItem, quantity: this.normalizeValue() },
                previousValue
            });
        }
    }

    onSave() {
        this.save.emit({
            saleType: this.saleType,
            discount: this.computedDiscount,
            client: this.client
        });
    }

    private normalizeValue(): number {
        return this.currentValues.length ? +this.currentValues.join('') : 1;
    }

    private init() {
        this.saleType = SaleType.DIRECT_SALE;
        this.client = null;
        this.discount = 0;
    }
}
