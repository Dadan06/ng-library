import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { getUrl } from 'src/app/core/store/selectors/router.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { HOME_MENU } from '../../constants/home.constant';
import { Menu } from '../../types/menu.interface';
import { generateMenusDependingOnUserRights } from '../../utils/menu-filter';

@Component({
    selector: 'app-home-root',
    templateUrl: './home-root.component.html',
    styleUrls: ['./home-root.component.scss']
})
export class HomeRootComponent implements OnInit {
    homeMenus: Menu[];
    url$: Observable<string>;

    constructor(
        private authenticationStore: Store<AuthenticationState>,
        private routerStore: Store<AppRouterState>
    ) {}

    ngOnInit() {
        this.authenticationStore
            .pipe(select(getUserPrivileges))
            .subscribe((privileges: Privilege[]) => {
                this.homeMenus = generateMenusDependingOnUserRights(HOME_MENU, privileges);
            });
        this.url$ = this.routerStore.pipe(select(getUrl));
    }
}
