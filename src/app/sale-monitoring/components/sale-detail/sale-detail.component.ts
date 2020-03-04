import { Component, Input } from '@angular/core';
import { Sale } from 'src/app/sale/types/sale.interface';

@Component({
    selector: 'app-sale-detail',
    templateUrl: './sale-detail.component.html',
    styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent {
    @Input() sale: Sale;
}
