import { Component, Input } from '@angular/core';
import { Sale } from '../../types/sale.interface';

@Component({
    selector: 'app-consignation-list',
    templateUrl: './consignation-list.component.html',
    styleUrls: ['./consignation-list.component.scss']
})
export class ConsignationListComponent {
    @Input() consignations: Sale[];
}
