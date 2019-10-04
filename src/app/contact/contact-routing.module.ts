import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserPrivileges } from '../role/constants/privilege.constants';
import { PrivilegeGuard } from '../root/guards/privileges.guard';
import { ContactRootComponent } from './containers/contact-root/contact-root.component';

const routes: Routes = [
    {
        path: '',
        component: ContactRootComponent,
        canActivate: [PrivilegeGuard],
        data: { privilege: UserPrivileges.CONTACT_LIST }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ContactRoutingModule {}
