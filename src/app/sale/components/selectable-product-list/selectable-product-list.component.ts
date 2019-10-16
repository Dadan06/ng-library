import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/product/types/product.interface';

@Component({
    selector: 'app-selectable-product-list',
    templateUrl: './selectable-product-list.component.html',
    styleUrls: ['./selectable-product-list.component.scss']
})
export class SelectableProductListComponent implements OnInit {
    @Input() products: Product[];

    @Output() addProduct: EventEmitter<Product> = new EventEmitter();

    constructor() {
        /** */
    }

    ngOnInit() {
        /** */
    }
}
