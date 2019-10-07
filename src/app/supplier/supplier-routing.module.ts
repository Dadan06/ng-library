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
        data: { privilege: UserPrivileges.VIEW_SUPPLIER },
        children: [
            {
                path: 'detail/:supplierId',
                component: SupplierFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_SUPPLIER }
            },
            {
                path: 'edit/:supplierId',
                component: SupplierFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_SUPPLIER }
            },
            {
                path: 'new',
                component: SupplierFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.CREATE_SUPPLIER }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SupplierRoutingModule {}
