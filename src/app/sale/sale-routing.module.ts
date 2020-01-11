import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { ConsignationRootComponent } from './containers/consignation-root/consignation-root.component';
import { SaleRootComponent } from './containers/sale-root/sale-root.component';

const routes: Routes = [
    {
        path: '',
        component: SaleRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.CREATE_SALE }
    },
    {
        path: 'consignation',
        component: ConsignationRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.CREATE_SALE }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SaleRoutingModule {}
