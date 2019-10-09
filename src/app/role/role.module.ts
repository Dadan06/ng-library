import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { SharedModule } from '../shared/shared.module';
import { RoleDetailComponent } from './components/role-detail/role-detail.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleDetailRootComponent } from './containers/role-detail-container/role-detail-root.component';
import { RoleFormRootComponent } from './containers/role-form-root/role-form-root.component';
import { RoleRootComponent } from './containers/role-root/role-root.component';
import { RoleRoutingModule } from './role-routing.module';
import { RoleService } from './services/role.service';
import { RoleEffects } from './store/effects/role.effects';
import { RoleRouterEffects } from './store/effects/role.router-effects';
import { roleReducer } from './store/reducers/role.reducer';

@NgModule({
    declarations: [
        RoleRootComponent,
        RoleFormRootComponent,
        RoleListComponent,
        RoleFormComponent,
        RoleDetailRootComponent,
        RoleDetailComponent
    ],
    imports: [
        CommonModule,
        RoleRoutingModule,
        NgSelectModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('role', roleReducer),
        EffectsModule.forFeature([RoleEffects, RoleRouterEffects]),
        ModalModule
    ],
    providers: [RoleService]
})
export class RoleModule {}
