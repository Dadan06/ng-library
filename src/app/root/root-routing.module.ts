import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessManagementRootComponent } from './components/access-management-root/access-management-root.component';
import { AdminRootComponent } from './components/admin-root/admin-root.component';
import { HomeRootComponent } from './components/home-root/home-root.component';
import { RootComponent } from './components/root/root.component';
import { ACCESS_MANAGEMENT_MENU } from './constants/access-management.constant';
import { ADMIN_MENU } from './constants/admin.constant';
import { HOME_MENU } from './constants/home.constant';
import { AuthenticationGuard } from './guards/authentication.guard';
import { DefaultRedirectionGuard } from './guards/default-redirection.guard';

const routes: Routes = [
    {
        path: '',
        component: RootComponent,
        canActivate: [AuthenticationGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomeRootComponent,
                data: { menus: HOME_MENU },
                canActivate: [DefaultRedirectionGuard],
                children: [
                    {
                        path: 'product',
                        loadChildren: '../product/product.module#ProductModule'
                    },
                    {
                        path: 'supplier',
                        loadChildren: '../supplier/supplier.module#SupplierModule'
                    }
                ]
            },
            {
                path: 'access-management',
                component: AccessManagementRootComponent,
                data: { menus: ACCESS_MANAGEMENT_MENU },
                canActivate: [DefaultRedirectionGuard],
                children: [
                    {
                        path: 'user',
                        loadChildren: '../user/user.module#UserModule'
                    },
                    {
                        path: 'role',
                        loadChildren: '../role/role.module#RoleModule'
                    }
                ]
            },
            {
                path: 'admin',
                component: AdminRootComponent,
                data: { menus: ADMIN_MENU },
                canActivate: [DefaultRedirectionGuard],
                children: [
                    {
                        path: 'sale',
                        loadChildren: '../sale/sale.module#SaleModule'
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RootRoutingModule {}
