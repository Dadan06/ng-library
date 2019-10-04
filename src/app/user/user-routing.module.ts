import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { UserFormRootComponent } from './containers/user-form-root/user-form-root.component';
import { UserRootComponent } from './containers/user-root/user-root.component';

const routes: Routes = [
    {
        path: '',
        component: UserRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.VIEW_USER },
        children: [
            {
                path: 'detail/:userId',
                component: UserFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_USER }
            },
            {
                path: 'edit/:userId',
                component: UserFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_USER }
            },
            {
                path: 'new',
                component: UserFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.CREATE_USER }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule {}
