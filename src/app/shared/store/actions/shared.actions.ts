import { HttpErrorResponse } from '@angular/common/http';
import { Action } from '@ngrx/store';
import { Client } from 'src/app/client/types/client.interface';

export const enum SharedActionTypes {
    LOAD_CLIENTS = '[Shared] Load Clients',
    LOAD_CLIENTS_FAIL = '[Shared] Load Clients Fail',
    LOAD_CLIENTS_SUCCESS = '[Shared] Load Clients Success'
}

export class LoadClients implements Action {
    readonly type = SharedActionTypes.LOAD_CLIENTS;
}

export class LoadClientsSuccess implements Action {
    readonly type = SharedActionTypes.LOAD_CLIENTS_SUCCESS;
    constructor(public payload: Client[]) {}
}

export class LoadClientsFail implements Action {
    readonly type = SharedActionTypes.LOAD_CLIENTS_FAIL;
    constructor(public payload: HttpErrorResponse) {}
}

export type SharedAction = LoadClients | LoadClientsSuccess | LoadClientsFail;
