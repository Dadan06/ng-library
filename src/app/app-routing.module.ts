import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    { path: '', redirectTo: 'authentication', pathMatch: 'full' },
    {
        path: 'authentication',
        loadChildren: './authentication/authentication.module#AuthenticationModule'
    },
    {
        path: 'root',
        loadChildren: './root/root.module#RootModule'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
