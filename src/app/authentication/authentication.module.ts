import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { AuthenticationRootComponent } from './containers/authentication-root/authentication-root.component';
import { AuthenticationMockService } from './services/authentication-mock.service';
import { AuthenticationService } from './services/authentication.service';
import { AuthenticationEffects } from './store/effects/authentication.effects';

@NgModule({
    imports: [
        CommonModule,
        AuthenticationRoutingModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([AuthenticationEffects]),
        SharedModule
    ],
    declarations: [AuthenticationRootComponent, AuthenticationComponent],
    providers: [
        {
            provide: AuthenticationService,
            useClass: environment.mock ? AuthenticationMockService : AuthenticationService
        }
    ]
})
export class AuthenticationModule {}
