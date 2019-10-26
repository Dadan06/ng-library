import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { ClientFormRootComponent } from './containers/client-form-root/client-form-root.component';
import { ClientRootComponent } from './containers/client-root/client-root.component';

const routes: Routes = [
    {
        path: '',
        component: ClientRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.VIEW_CLIENT },
        children: [
            {
                path: 'detail/:clientId',
                component: ClientFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_CLIENT }
            },
            {
                path: 'edit/:clientId',
                component: ClientFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_CLIENT }
            },
            {
                path: 'new',
                component: ClientFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.CREATE_CLIENT }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {}
