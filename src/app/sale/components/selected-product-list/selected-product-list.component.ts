import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { QuantityChangingData, SaleItem, SaleItemStatus } from '../../types/sale-item.interface';

@Component({
    selector: 'app-selected-product-list',
    templateUrl: './selected-product-list.component.html',
    styleUrls: ['./selected-product-list.component.scss']
})
export class SelectedProductListComponent implements OnInit {
    @Input() saleItems: SaleItem[];

    @Output() delete: EventEmitter<SaleItem> = new EventEmitter();
    @Output() cancel: EventEmitter<void> = new EventEmitter();
    @Output() save: EventEmitter<void> = new EventEmitter();
    @Output() changeQty: EventEmitter<QuantityChangingData> = new EventEmitter();

    currentValues = [1];

    private digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    private notDigits = ['Delete', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];

    constructor() {
        /** */
    }

    ngOnInit() {
        /** */
    }

    get billTotal() {
        const validSaleItems = this.saleItems.filter(s => s.status === SaleItemStatus.ORDERED);
        return validSaleItems.reduce(
            (m: number, s: SaleItem) => m + s.quantity * s.product.sellingPrice,
            0
        );
    }

    get validSaleItemsLength() {
        return this.saleItems.filter(s => s.status === SaleItemStatus.ORDERED).length;
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

    private normalizeValue(): number {
        return this.currentValues.length ? +this.currentValues.join('') : 1;
    }
}
