import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SaleItem, SaleItemStatus } from '../../types/sale-item.interface';

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
    @Output() changeValue: EventEmitter<SaleItem> = new EventEmitter();

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

    onChangeValue(saleItem: SaleItem, value: number) {
        this.changeValue.emit({ ...saleItem, quantity: value });
    }
}
