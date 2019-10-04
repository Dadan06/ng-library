import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from '../shared/shared.module';
import { MasterDetailFormComponent } from './components/master-detail-form/master-detail-form.component';
import { MasterDetailListComponent } from './components/master-detail-list/master-detail-list.component';
import { MasterDetailRootComponent } from './containers/master-detail-root/master-detail-root.component';
import { MasterDetailFormRootComponent } from './containers/master-detail-form-root/master-detail-form-root.component';
import { MasterDetailRoutingModule } from './master-detail-routing.module';
import { MasterDetailService } from './services/master-detail.service';
import { MasterDetailEffects } from './store/effects/master-detail.effects';
import { MasterDetailRouterEffects } from './store/effects/master-detail-router.effects';
import { masterDetailReducer } from './store/reducers/master-detail.reducers';
import { MasterDetailMockService } from './services/master-detail-mock.service';

@NgModule({
    declarations: [
        MasterDetailRootComponent,
        MasterDetailFormRootComponent,
        MasterDetailListComponent,
        MasterDetailFormComponent
    ],
    imports: [
        CommonModule,
        MasterDetailRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('master-detail', masterDetailReducer),
        EffectsModule.forFeature([MasterDetailEffects, MasterDetailRouterEffects]),
        ModalModule
    ],
    providers: [
        {
            provide: MasterDetailService,
            useClass: MasterDetailMockService
        }
    ]
})
export class MasterDetailModule {}
