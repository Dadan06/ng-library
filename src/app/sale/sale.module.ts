import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from '../product/services/product.service';
import { SharedModule } from '../shared/shared.module';
import { SelectableProductListComponent } from './components/selectable-product-list/selectable-product-list.component';
import { SelectedProductListComponent } from './components/selected-product-list/selected-product-list.component';
import { SaleRootComponent } from './containers/sale-root/sale-root.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SaleService } from './services/sale.service';
import { SaleRouterEffects } from './store/effects/sale-router.effects';
import { SaleEffects } from './store/effects/sale.effects';
import { saleReducer } from './store/reducers/sale.reducers';
@NgModule({
    declarations: [SelectableProductListComponent, SelectedProductListComponent, SaleRootComponent],
    imports: [
        CommonModule,
        SharedModule,
        SaleRoutingModule,
        StoreModule.forFeature('sale', saleReducer),
        EffectsModule.forFeature([SaleEffects, SaleRouterEffects])
    ],
    providers: [SaleService, ProductService]
})
export class SaleModule {}
