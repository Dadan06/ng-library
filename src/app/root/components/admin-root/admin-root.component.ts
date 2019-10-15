import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { getUrl } from 'src/app/core/store/selectors/router.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { ADMIN_MENU } from '../../constants/admin.constant';
import { Menu } from '../../types/menu.interface';
import { generateSideNavMenusDependingOnUserRights } from '../../utils/menu-filter';

@Component({
    selector: 'app-admin-root',
    templateUrl: './admin-root.component.html',
    styleUrls: ['./admin-root.component.scss']
})
export class AdminRootComponent implements OnInit {
    adminMenus: Menu[];
    url$: Observable<string>;

    constructor(
        private authenticationStore: Store<AuthenticationState>,
        private routerStore: Store<AppRouterState>
    ) {}

    ngOnInit() {
        this.authenticationStore
            .pipe(select(getUserPrivileges))
            .subscribe((privileges: Privilege[]) => {
                this.adminMenus = generateSideNavMenusDependingOnUserRights(ADMIN_MENU, privileges);
            });
        this.url$ = this.routerStore.pipe(select(getUrl));
    }
}
