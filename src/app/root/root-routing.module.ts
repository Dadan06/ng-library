import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessManagementRootComponent } from './components/access-management-root/access-management-root.component';
import { AdminRootComponent } from './components/admin-root/admin-root.component';
import { HomeRootComponent } from './components/home-root/home-root.component';
import { ParamRootComponent } from './components/param-root/param-root.component';
import { RootComponent } from './components/root/root.component';
import { AuthenticationGuard } from './guards/authentication.guard';

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
                children: [
                    { path: '', redirectTo: 'product', pathMatch: 'full' },
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
            { path: 'admin', component: AdminRootComponent },
            { path: 'param', component: ParamRootComponent },
            {
                path: 'access-management',
                component: AccessManagementRootComponent,
                children: [
                    { path: '', redirectTo: 'user', pathMatch: 'full' },
                    {
                        path: 'user',
                        loadChildren: '../user/user.module#UserModule'
                    },
                    {
                        path: 'role',
                        loadChildren: '../role/role.module#RoleModule'
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
