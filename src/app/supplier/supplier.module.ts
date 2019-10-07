import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from '../shared/shared.module';
import { SupplierFormComponent } from './components/supplier-form/supplier-form.component';
import { SupplierListComponent } from './components/supplier-list/supplier-list.component';
import { SupplierFormRootComponent } from './containers/supplier-form-root/supplier-form-root.component';
import { SupplierRootComponent } from './containers/supplier-root/supplier-root.component';
import { SupplierService } from './services/supplier.service';
import { SupplierRouterEffects } from './store/effects/supplier-router.effects';
import { SupplierEffects } from './store/effects/supplier.effects';
import { supplierReducer } from './store/reducers/supplier.reducers';
import { SupplierRoutingModule } from './supplier-routing.module';

@NgModule({
    declarations: [
        SupplierRootComponent,
        SupplierFormRootComponent,
        SupplierListComponent,
        SupplierFormComponent
    ],
    imports: [
        CommonModule,
        SupplierRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('supplier', supplierReducer),
        EffectsModule.forFeature([SupplierEffects, SupplierRouterEffects]),
        ModalModule
    ],
    providers: [SupplierService]
})
export class SupplierModule {}
