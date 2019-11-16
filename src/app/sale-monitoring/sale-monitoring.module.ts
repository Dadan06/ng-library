import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { SaleRootComponent } from './containers/sale-root/sale-root.component';
import { SaleDetailRootComponent } from './containers/sale-detail-root/sale-detail-root.component';

@NgModule({
  declarations: [SaleListComponent, SaleDetailComponent, SaleRootComponent, SaleDetailRootComponent],
  imports: [
    CommonModule
  ]
})
export class SaleMonitoringModule { }
