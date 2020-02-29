import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';
import { Supplier } from '../../types/supplier.interface';

@Component({
    selector: 'app-supplier-list',
    templateUrl: './supplier-list.component.html',
    styleUrls: ['./supplier-list.component.scss']
})
export class SupplierListComponent extends SortableTableComponent {
    @Input() suppliers: Supplier[];
    @Input() currentSupplier: Supplier;
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Output() view: EventEmitter<Supplier> = new EventEmitter<Supplier>();
    @Output() edit: EventEmitter<Supplier> = new EventEmitter<Supplier>();
    @Output() delete: EventEmitter<Supplier> = new EventEmitter<Supplier>();
}
