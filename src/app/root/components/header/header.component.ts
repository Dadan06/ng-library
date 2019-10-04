import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { LogOut } from 'src/app/authentication/store/actions/authentication.actions';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import {
    getLoggedUser,
    getUserPrivileges
} from 'src/app/authentication/store/selectors/authentication.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { User } from 'src/app/user/types/user.interface';
import { HEADER_MENU } from '../../constants/header-menu.interface';
import { Menu } from '../../types/menu.interface';
import { generateMenusDependingOnUserRights } from '../../utils/menu-filter';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    connexionTime: string;
    user$: Observable<User>;
    menus: Menu[];

    constructor(private store: Store<AuthenticationState>) {}

    ngOnInit() {
        this.user$ = this.store.pipe(select(getLoggedUser));
        this.store.pipe(select(getUserPrivileges)).subscribe((privileges: Privilege[]) => {
            this.menus = generateMenusDependingOnUserRights(HEADER_MENU, privileges);
        });
    }

    logOut() {
        this.store.dispatch(new LogOut());
    }
}
