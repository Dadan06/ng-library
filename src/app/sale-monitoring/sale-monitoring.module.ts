import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import { SaleDetailRootComponent } from './containers/sale-detail-root/sale-detail-root.component';
import { SaleRootComponent } from './containers/sale-root/sale-root.component';
import { SaleMonitoringRoutingModule } from './sale-monitoring-routing.module';
import { SaleMonitoringService } from './services/sale-monitoring.service';
import { SaleMonitoringRouterEffects } from './store/effects/sale-monitoring-router.effects';
import { SaleMonitoringEffects } from './store/effects/sale-monitoring.effects';
import { saleMonitoringReducer } from './store/reducers/sale-monitoring.reducers';

@NgModule({
    declarations: [
        SaleListComponent,
        SaleRootComponent,
        SaleDetailComponent,
        SaleDetailRootComponent
    ],
    imports: [
        CommonModule,
        SaleMonitoringRoutingModule,
        SharedModule,
        StoreModule.forFeature('sale-monitoring', saleMonitoringReducer),
        EffectsModule.forFeature([SaleMonitoringEffects, SaleMonitoringRouterEffects])
    ],
    providers: [SaleMonitoringService]
})
export class SaleMonitoringModule {}
