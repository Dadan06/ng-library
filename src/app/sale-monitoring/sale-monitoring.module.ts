import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleRootComponent } from './containers/sale-root/sale-root.component';
import { SaleMonitoringRoutingModule } from './sale-monitoring-routing.module';

@NgModule({
    declarations: [SaleListComponent, SaleRootComponent],
    imports: [CommonModule, SaleMonitoringRoutingModule, SharedModule]
})
export class SaleMonitoringModule {}
