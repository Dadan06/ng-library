import { Action } from '@ngrx/store';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { Client } from '../../types/client.interface';

export const enum ClientActionTypes {
    LOAD_CLIENT_MODELS = '[Client] Load Clients',
    LOAD_CLIENT_MODELS_FAIL = '[Client] Load Clients Fail',
    LOAD_CLIENT_MODELS_SUCCESS = '[Client] Load Clients Success',
    LOAD_CLIENT_MODEL = '[Client] Load Client',
    LOAD_CLIENT_MODEL_FAIL = '[Client] Load Client Fail',
    LOAD_CLIENT_MODEL_SUCCESS = '[Client] Load Client Success',
    DELETE_CLIENT_MODEL = '[Client] Delete Client',
    DELETE_CLIENT_MODEL_FAIL = '[Client] Delete Client Fail',
    DELETE_CLIENT_MODEL_SUCCESS = '[Client] Delete Client Success',
    SAVE_CLIENT_MODEL = '[Client] Save Client',
    SAVE_CLIENT_MODEL_FAIL = '[Client] Save Client Fail',
    SAVE_CLIENT_MODEL_SUCCESS = '[Client] Save Client Success'
}

export class LoadClients implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_MODELS;
    constructor(public payload: ListCriteria) {}
}

export class LoadClientsSuccess implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_MODELS_SUCCESS;
    constructor(public payload: Paginated<Client>) {}
}

export class LoadClientsFail implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_MODELS_FAIL;
    constructor(public payload: Error) {}
}

export class LoadClient implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_MODEL;
    constructor(public payload: string) {}
}

export class LoadClientSuccess implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_MODEL_SUCCESS;
    constructor(public payload: Client) {}
}

export class LoadClientFail implements Action {
    readonly type = ClientActionTypes.LOAD_CLIENT_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveClient implements Action {
    readonly type = ClientActionTypes.SAVE_CLIENT_MODEL;
    constructor(public payload: Client) {}
}

export class SaveClientFail implements Action {
    readonly type = ClientActionTypes.SAVE_CLIENT_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class SaveClientSuccess implements Action {
    readonly type = ClientActionTypes.SAVE_CLIENT_MODEL_SUCCESS;
    constructor(public payload: Client) {}
}

export class DeleteClient implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT_MODEL;
    constructor(public payload: Client) {}
}

export class DeleteClientFail implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT_MODEL_FAIL;
    constructor(public payload: Error) {}
}

export class DeleteClientSuccess implements Action {
    readonly type = ClientActionTypes.DELETE_CLIENT_MODEL_SUCCESS;
}

export type ClientAction =
    | LoadClients
    | LoadClientsSuccess
    | LoadClientsFail
    | LoadClient
    | LoadClientSuccess
    | LoadClientFail
    | DeleteClient
    | DeleteClientFail
    | DeleteClientSuccess
    | SaveClient
    | SaveClientFail
    | SaveClientSuccess;
