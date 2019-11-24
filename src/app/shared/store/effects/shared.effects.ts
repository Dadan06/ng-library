import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ClientService } from 'src/app/client/services/client.service';
import { Client } from 'src/app/client/types/client.interface';
import {
    LoadClients,
    LoadClientsFail,
    LoadClientsSuccess,
    SharedActionTypes
} from '../actions/shared.actions';

@Injectable()
export class SharedEffects {
    constructor(private action$: Actions, private clientService: ClientService) {}

    @Effect()
    loadClients$ = this.action$.pipe(
        ofType(SharedActionTypes.LOAD_CLIENTS),
        switchMap(
            (action: LoadClients): Observable<Client[]> => this.clientService.loadAllClient()
        ),
        map((response: Client[]) => new LoadClientsSuccess(response)),
        catchError(error => of(new LoadClientsFail(error)))
    );
}
