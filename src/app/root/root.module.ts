import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
import { AuthenticationMockService } from '../authentication/services/authentication-mock.service';
import { AuthenticationService } from '../authentication/services/authentication.service';
import { AuthenticationEffects } from '../authentication/store/effects/authentication.effects';
import { AccessManagementRootComponent } from './components/access-management-root/access-management-root.component';
import { AdminRootComponent } from './components/admin-root/admin-root.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeRootComponent } from './components/home-root/home-root.component';
import { ParamRootComponent } from './components/param-root/param-root.component';
import { RootComponent } from './components/root/root.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { PrivilegeGuard } from './guards/privileges.guard';
import { RootRoutingModule } from './root-routing.module';
/**
 * Module which regroups component which is the entry point of features
 * that cannot be accessed without authentification, and all single use
 * components whose instance will be shared throughout those features
 * (header, sidenav, ...)
 */
@NgModule({
    imports: [CommonModule, RootRoutingModule, EffectsModule.forRoot([AuthenticationEffects])],
    declarations: [
        RootComponent,
        HeaderComponent,
        HomeRootComponent,
        AdminRootComponent,
        ParamRootComponent,
        SideNavComponent,
        AccessManagementRootComponent
    ],
    providers: [
        AuthenticationGuard,
        PrivilegeGuard,
        {
            provide: AuthenticationService,
            useClass: environment.mock ? AuthenticationMockService : AuthenticationService
        }
    ]
})
export class RootModule {}
