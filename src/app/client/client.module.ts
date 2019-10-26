import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientListComponent } from './components/client-list/client-list.component';
import { ClientFormRootComponent } from './containers/client-form-root/client-form-root.component';
import { ClientRootComponent } from './containers/client-root/client-root.component';
import { ClientService } from './services/client.service';
import { ClientRouterEffects } from './store/effects/client-router.effects';
import { ClientEffects } from './store/effects/client.effects';
import { clientReducer } from './store/reducers/client.reducers';

@NgModule({
    declarations: [
        ClientListComponent,
        ClientFormComponent,
        ClientFormRootComponent,
        ClientRootComponent
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        SharedModule,
        ReactiveFormsModule,
        NgSelectModule,
        StoreModule.forFeature('client', clientReducer),
        EffectsModule.forFeature([ClientEffects, ClientRouterEffects]),
        ModalModule
    ],
    providers: [ClientService]
})
export class ClientModule {}
