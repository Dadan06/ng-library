import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { SupplierFormRootComponent } from './containers/supplier-form-root/supplier-form-root.component';
import { SupplierRootComponent } from './containers/supplier-root/supplier-root.component';

const routes: Routes = [
    {
        path: '',
        component: SupplierRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.VIEW_MASTER_DETAIL_MODEL },
        children: [
            {
                path: 'detail/:masterDetailModelId',
                component: SupplierFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_MASTER_DETAIL_MODEL }
            },
            {
                path: 'edit/:masterDetailModelId',
                component: SupplierFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_MASTER_DETAIL_MODEL }
            },
            {
                path: 'new',
                component: SupplierFormRootComponent,
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
export class SupplierRoutingModule {}
