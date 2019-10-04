import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { MasterDetailFormRootComponent } from './containers/master-detail-form-root/master-detail-form-root.component';
import { MasterDetailRootComponent } from './containers/master-detail-root/master-detail-root.component';

const routes: Routes = [
    {
        path: '',
        component: MasterDetailRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.VIEW_MASTER_DETAIL_MODEL },
        children: [
            {
                path: 'detail/:masterDetailModelId',
                component: MasterDetailFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_MASTER_DETAIL_MODEL }
            },
            {
                path: 'edit/:masterDetailModelId',
                component: MasterDetailFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_MASTER_DETAIL_MODEL }
            },
            {
                path: 'new',
                component: MasterDetailFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.CREATE_MASTER_DETAIL_MODEL }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MasterDetailRoutingModule {}
