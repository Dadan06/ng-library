import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ModalModule } from 'angular-custom-modal';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './components/user-form/user-form.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormRootComponent } from './containers/user-form-root/user-form-root.component';
import { UserRootComponent } from './containers/user-root/user-root.component';
import { UserMockService } from './services/user-mock.service';
import { UserService } from './services/user.service';
import { UserRouterEffects } from './store/effects/user-router.effects';
import { UserEffects } from './store/effects/user.effects';
import { userReducer } from './store/reducers/user.reducers';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
    declarations: [UserRootComponent, UserFormRootComponent, UserListComponent, UserFormComponent],
    imports: [
        CommonModule,
        UserRoutingModule,
        NgSelectModule,
        SharedModule,
        ReactiveFormsModule,
        StoreModule.forFeature('user', userReducer),
        EffectsModule.forFeature([UserEffects, UserRouterEffects]),
        ModalModule
    ],
    providers: [
        {
            provide: UserService,
            useClass: environment.mock ? UserMockService : UserService
        }
    ]
})
export class UserModule {}
