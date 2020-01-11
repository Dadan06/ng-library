import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Client } from 'src/app/client/types/client.interface';
import { Incrementation } from 'src/app/shared/types/incrementation.interface';
import { ChangeQtyPayload, SaleItem, SaleItemStatus } from '../../types/sale-item.interface';
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
    @Output() changeQty: EventEmitter<ChangeQtyPayload> = new EventEmitter();

    saleType: SaleType;
    client: Client;
    discount: number;

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

    onChangeQty(saleItem: SaleItem, incrementation: Incrementation) {
        this.changeQty.emit({ saleItem, incrementation });
    }

    onSave() {
        this.save.emit({
            saleType: this.saleType,
            discount: this.computedDiscount,
            client: this.client,
            consignation: this.saleType === SaleType.CONSIGNATION ? { selled: 0, left: 0 } : null
        });
    }

    private init() {
        this.saleType = SaleType.DIRECT_SALE;
        this.client = null;
        this.discount = 0;
    }
}
