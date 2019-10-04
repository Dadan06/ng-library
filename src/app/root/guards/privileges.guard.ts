import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { Privilege } from 'src/app/role/types/privilege.interface';

@Injectable()
export class PrivilegeGuard implements CanActivate {
    constructor(private store: Store<AuthenticationState>) {}
    canActivate(route: ActivatedRouteSnapshot) {
        return this.store.pipe(
            select(getUserPrivileges),
            map(
                (privileges: Privilege[] = []) =>
                    !!privileges.find(p => p.name === route.data.privilege)
            )
        );
    }
}
