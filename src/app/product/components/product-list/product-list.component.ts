import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortableTableComponent } from 'src/app/shared/components/sortable-table/sortable-table.component';
import { TYPE_LABELS } from '../../constants/product.constants';
import { Product } from '../../types/product.interface';

@Component({
    selector: 'app-product-list',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent extends SortableTableComponent {
    @Input() products: Product[];
    @Input() currentProduct: Product;
    @Input() editEnabled = true;
    @Input() deleteEnabled = true;
    @Output() view: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
    @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

    typeLabels = TYPE_LABELS;
}
