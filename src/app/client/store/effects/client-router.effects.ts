import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ROUTER_NAVIGATION } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { AppRouterState } from 'src/app/core/store/reducers/router.reducers';
import { CLIENT_API_ROUTE } from '../../constants/client.constants';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types/client.interface';
import { LoadClient, LoadClients, LoadClientSuccess } from '../actions/client.actions';
import { ClientState } from '../reducers/client.reducers';
import { getClientCriteria, getClients } from '../selectors/client.selectors';

@Injectable()
export class ClientRouterEffects {
    constructor(
        private action$: Actions,
        private store: Store<ClientState>,
        private clientService: ClientService
    ) {}

    private mapToRouterStateUrl = (action): AppRouterState => action.payload.routerState;

    @Effect()
    clientRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${CLIENT_API_ROUTE}`)),
        withLatestFrom(
            this.store.pipe(select(getClients)),
            this.store.pipe(select(getClientCriteria))
        ),
        filter(([routerState, clients]) => clients.length === 0),
        map(([routerState, clients, clientCriteria]) => new LoadClients(clientCriteria))
    );

    @Effect()
    clientFormRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(
            state =>
                state.url.includes(`${CLIENT_API_ROUTE}/detail`) ||
                state.url.includes(`${CLIENT_API_ROUTE}/edit`)
        ),
        map(routerState => new LoadClient(routerState.params.clientId))
    );

    @Effect()
    clientNewRoute$ = this.action$.pipe(
        ofType(ROUTER_NAVIGATION),
        map(this.mapToRouterStateUrl),
        filter(state => state.url.includes(`${CLIENT_API_ROUTE}/new`)),
        switchMap(() =>
            this.clientService
                .clientFactory()
                .pipe(map((response: Client) => new LoadClientSuccess(response)))
        )
    );
}
