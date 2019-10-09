import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { ProductFormRootComponent } from './containers/product-form-root/product-form-root.component';
import { ProductListRootComponent } from './containers/product-list-root/product-list-root.component';

const routes: Routes = [
    {
        path: '',
        component: ProductListRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.VIEW_PRODUCT },
        children: [
            {
                path: 'detail/:productId',
                component: ProductFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.VIEW_PRODUCT }
            },
            {
                path: 'edit/:productId',
                component: ProductFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.EDIT_PRODUCT }
            },
            {
                path: 'new',
                component: ProductFormRootComponent,
                canActivate: [PrivilegeGuard],
                data: { privilege: UserPrivileges.CREATE_PRODUCT }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule {}
