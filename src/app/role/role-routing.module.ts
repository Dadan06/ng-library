import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { UserPrivileges } from './constants/privilege.constants';
import { RoleDetailRootComponent } from './containers/role-detail-container/role-detail-root.component';
import { RoleFormRootComponent } from './containers/role-form-root/role-form-root.component';
import { RoleRootComponent } from './containers/role-root/role-root.component';

const routes: Routes = [
    {
        path: '',
        component: RoleRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.VIEW_ROLE },
        children: [
            {
                path: 'detail/:roleId',
                component: RoleDetailRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_ROLE }
            },
            {
                path: 'edit/:roleId',
                component: RoleFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_ROLE }
            },
            {
                path: 'new',
                component: RoleFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.CREATE_ROLE }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RoleRoutingModule {}
