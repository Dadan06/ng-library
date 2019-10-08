import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { HEADER_MENU } from '../../constants/header-menu.interface';
import { Menu } from '../../types/menu.interface';
import { filterHeaderMenusDependingOnUserRight } from '../../utils/menu-filter';

@Component({
    selector: 'app-root',
    templateUrl: './root.component.html',
    styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
    headerMenus: Menu[] = [];

    constructor(private authenticationStore: Store<AuthenticationState>) {}

    ngOnInit() {
        this.authenticationStore
            .pipe(select(getUserPrivileges))
            .subscribe((privileges: Privilege[] = []) => {
                this.headerMenus = filterHeaderMenusDependingOnUserRight(HEADER_MENU, privileges);
            });
    }
}
