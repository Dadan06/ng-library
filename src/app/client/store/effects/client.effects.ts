import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap, withLatestFrom } from 'rxjs/operators';
import { Go } from 'src/app/core/store/actions/router.actions';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { CLIENT_BASE_ROUTE } from '../../constants/client.constants';
import { ClientService } from '../../services/client.service';
import { Client } from '../../types/client.interface';
import {
    ClientActionTypes,
    DeleteClient,
    DeleteClientFail,
    DeleteClientSuccess,
    LoadClient,
    LoadClientFail,
    LoadClients,
    LoadClientsFail,
    LoadClientsSuccess,
    LoadClientSuccess,
    SaveClient,
    SaveClientFail,
    SaveClientSuccess
} from '../actions/client.actions';
import { ClientState } from '../reducers/client.reducers';
import { getClientCriteria } from '../selectors/client.selectors';

@Injectable()
export class ClientEffects {
    constructor(
        private action$: Actions,
        private clientService: ClientService,
        private store: Store<ClientState>
    ) {}

    @Effect()
    loadClients$ = this.action$.pipe(
        ofType(ClientActionTypes.LOAD_CLIENT_MODELS),
        switchMap(
            (action: LoadClients): Observable<Paginated<Client>> =>
                this.clientService.loadClients(action.payload)
        ),
        map((response: Paginated<Client>) => new LoadClientsSuccess(response)),
        catchError(error => of(new LoadClientsFail(error)))
    );

    @Effect()
    loadClient$ = this.action$.pipe(
        ofType(ClientActionTypes.LOAD_CLIENT_MODEL),
        switchMap(
            (action: LoadClient): Observable<Client> =>
                this.clientService.loadClient(action.payload)
        ),
        map((response: Client) => new LoadClientSuccess(response)),
        catchError(error => of(new LoadClientFail(error)))
    );

    @Effect()
    saveClient$ = this.action$.pipe(
        ofType(ClientActionTypes.SAVE_CLIENT_MODEL),
        switchMap(
            (action: SaveClient): Observable<Client> =>
                this.clientService.saveClient(action.payload)
        ),
        map((response: Client) => new SaveClientSuccess(response)),
        catchError(error => of(new SaveClientFail(error)))
    );

    @Effect()
    saveClientSuccess$ = this.action$.pipe(
        ofType(ClientActionTypes.SAVE_CLIENT_MODEL_SUCCESS),
        map((action: SaveClientSuccess) => action.payload),
        withLatestFrom(this.store.pipe(select(getClientCriteria))),
        mergeMap(([client, criteria]) => [
            new LoadClients(criteria),
            new Go({
                path: [`${CLIENT_BASE_ROUTE}/detail/${client._id}`]
            })
        ])
    );

    @Effect()
    deleteClient$ = this.action$.pipe(
        ofType(ClientActionTypes.DELETE_CLIENT_MODEL),
        switchMap(
            (action: DeleteClient): Observable<void> =>
                this.clientService.deleteClient(action.payload)
        ),
        mergeMap(() => [
            new DeleteClientSuccess(),
            new Go({
                path: [`${CLIENT_BASE_ROUTE}`]
            })
        ]),
        catchError(error => of(new DeleteClientFail(error)))
    );

    @Effect()
    deleteClientSuccess$ = this.action$.pipe(
        ofType(ClientActionTypes.DELETE_CLIENT_MODEL_SUCCESS),
        withLatestFrom(this.store.pipe(select(getClientCriteria))),
        map(([action, criteria]) => new LoadClients(criteria))
    );
}
