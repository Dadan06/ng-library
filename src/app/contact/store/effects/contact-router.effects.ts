import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { LoadContacts } from '../actions/contact.actions';
import { ContactState } from '../reducers/contact.reducers';
import { getContactCriteria } from '../selectors/contact.selectors';

@Injectable()
export class ContactRouterEffects {
    constructor(private action$: Actions, private store: Store<ContactState>) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    contactRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes('contact')),
        withLatestFrom(this.store.pipe(select(getContactCriteria))),
        map(([routerState, contactCriteria]) => new LoadContacts(contactCriteria))
    );
}
