import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationRootComponent } from './containers/authentication-root/authentication-root.component';

const routes: Routes = [{ path: '', component: AuthenticationRootComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthenticationRoutingModule {}
