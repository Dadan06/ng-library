import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SelectableProductListComponent } from './components/selectable-product-list/selectable-product-list.component';
import { SelectedProductListComponent } from './components/selected-product-list/selected-product-list.component';
import { SaleRootComponent } from './containers/sale-root/sale-root.component';
import { SaleRoutingModule } from './sale-routing.module';

@NgModule({
    declarations: [SelectableProductListComponent, SelectedProductListComponent, SaleRootComponent],
    imports: [CommonModule, SharedModule, SaleRoutingModule]
})
export class SaleModule {}
