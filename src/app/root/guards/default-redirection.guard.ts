import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { pipe } from 'rxjs';
import { map, tap, withLatestFrom } from 'rxjs/operators';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { getUrl } from 'src/app/core/store/selectors/router.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { getFirstAvailableMenu } from 'src/app/shared/utils/get-first-avalaible-menu.utils';

@Injectable()
export class DefaultRedirectionGuard implements CanActivate {
    constructor(
        private store: Store<AuthenticationState>,
        private routerStore: Store<AppRouterState>,
        public router: Router
    ) {}
    canActivate(route: ActivatedRouteSnapshot) {
        return this.store.pipe(
            select(getUserPrivileges),
            withLatestFrom<Privilege[], string>(this.routerStore.select(pipe(getUrl))),
            tap(([privileges = [], url]) => {
                const firstAccessibleRoute = getFirstAvailableMenu(
                    privileges.map(p => p.name),
                    route.data.menus
                );
                const urlSegment = route.url[0].path;
                if (url.endsWith(urlSegment)) {
                    this.router.navigate([firstAccessibleRoute.routerLink]);
                }
            }),
            map(() => true)
        );
    }
}
