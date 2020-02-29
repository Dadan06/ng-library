import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';
import { Payment } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-list',
    templateUrl: './consignation-list.component.html',
    styleUrls: ['./consignation-list.component.scss']
})
export class ConsignationListComponent extends SortableTableComponent {
    @Input() consignations: Payment[];
    @Input() currentConsignation: Payment;

    @Output() view: EventEmitter<Payment> = new EventEmitter<Payment>();
    @Output() edit: EventEmitter<Payment> = new EventEmitter<Payment>();
}
