import { Component, Input } from '@angular/core';
import { SaleItem } from 'src/app/sale/types/sale-item.interface';

@Component({
    selector: 'app-sale-detail',
    templateUrl: './sale-detail.component.html',
    styleUrls: ['./sale-detail.component.scss']
})
export class SaleDetailComponent {
    @Input() saleItems: SaleItem[];
}
