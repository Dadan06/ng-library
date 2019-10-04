import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { ACCESS_MANAGEMENT_MENU } from '../../constants/access-management.constant';
import { Menu } from '../../types/menu.interface';
import { generateMenusDependingOnUserRights } from '../../utils/menu-filter';

@Component({
    selector: 'app-access-management-root',
    templateUrl: './access-management-root.component.html',
    styleUrls: ['./access-management-root.component.scss']
})
export class AccessManagementRootComponent implements OnInit {
    accessManagementMenus: Menu[];

    constructor(private authenticationStore: Store<AuthenticationState>) {}

    ngOnInit() {
        this.authenticationStore
            .pipe(select(getUserPrivileges))
            .subscribe((privileges: Privilege[]) => {
                this.accessManagementMenus = generateMenusDependingOnUserRights(
                    ACCESS_MANAGEMENT_MENU,
                    privileges
                );
            });
    }
}
