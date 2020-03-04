import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';
import { SaleItem } from '../../types/sale-item.interface';
import { Payment } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-list',
    templateUrl: './consignation-list.component.html',
    styleUrls: ['./consignation-list.component.scss']
})
export class ConsignationListComponent extends SortableTableComponent {
    @Input() consignations: Payment[];
    @Input() currentSaleItem: SaleItem;

    @Output() view: EventEmitter<SaleItem> = new EventEmitter();
    @Output() edit: EventEmitter<SaleItem> = new EventEmitter();

    computeLeftQuantity(saleItem: SaleItem): number {
        return saleItem.consignations.reduce(
            (acc, current) =>
                +acc +
                saleItem.quantity -
                // tslint:disable-next-line: binary-expression-operand-order
                (+saleItem.quantity - current.selled || 0 + +current.returned || 0),
            0
        );
    }
}
