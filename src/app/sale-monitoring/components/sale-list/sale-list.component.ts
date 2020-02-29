import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SALE_TYPE_LABELS } from 'src/app/sale/constants/sale.constant';
import { Sale } from 'src/app/sale/types/sale.interface';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';

@Component({
    selector: 'app-sale-list',
    templateUrl: './sale-list.component.html',
    styleUrls: ['./sale-list.component.scss']
})
export class SaleListComponent extends SortableTableComponent {
    @Input() sales: Sale[];
    @Input() currentSale: Sale;

    @Output() view: EventEmitter<Sale> = new EventEmitter();

    saleTypeLabels = SALE_TYPE_LABELS;
}
