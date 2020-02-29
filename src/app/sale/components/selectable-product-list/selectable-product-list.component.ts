import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/product/types/product.interface';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';

@Component({
    selector: 'app-selectable-product-list',
    templateUrl: './selectable-product-list.component.html',
    styleUrls: ['./selectable-product-list.component.scss']
})
export class SelectableProductListComponent extends SortableTableComponent {
    @Input() products: Product[];

    @Output() add: EventEmitter<Product> = new EventEmitter();
}
