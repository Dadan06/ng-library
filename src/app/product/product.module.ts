import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from '../shared/shared.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormRootComponent } from './containers/product-form-root/product-form-root.component';
import { ProductListRootComponent } from './containers/product-list-root/product-list-root.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductService } from './services/product.service';
import { ProductRouterEffects } from './store/effects/product-router.effects';
import { ProductEffects } from './store/effects/product.effects';
import { productReducer } from './store/reducers/product.reducers';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductFormComponent,
        ProductListRootComponent,
        ProductFormRootComponent
    ],
    imports: [
        CommonModule,
        ProductRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('product', productReducer),
        EffectsModule.forFeature([ProductEffects, ProductRouterEffects]),
        ModalModule
    ],
    providers: [ProductService]
})
export class ProductModule {}
