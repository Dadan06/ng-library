import { Paginated } from 'src/app/shared/types/paginated.interface';
import { CLIENT_DEFAULT_CRITERIA } from '../../constants/client.constants';
import { ClientCriteria } from '../../types/client-criteria.interface';
import { Client } from '../../types/client.interface';
import {
    ClientAction,
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

export interface ClientState {
    clients: Paginated<Client>;
    clientsLoaded: boolean;
    clientsLoading: boolean;
    clientCriteria: ClientCriteria;
    client: Client;
    clientLoaded: boolean;
    clientLoading: boolean;
    clientSaved: boolean;
    clientSaving: boolean;
    clientDeleting: boolean;
    clientDeleted: boolean;
}

const initialState: ClientState = {
    clients: { items: [], totalItems: 0 },
    clientsLoaded: false,
    clientsLoading: false,
    clientCriteria: CLIENT_DEFAULT_CRITERIA,
    client: undefined,
    clientLoaded: false,
    clientLoading: false,
    clientSaving: false,
    clientSaved: false,
    clientDeleting: false,
    clientDeleted: false
};

const loadClients = (state: ClientState, action: LoadClients): ClientState => ({
    ...state,
    clientsLoading: true,
    clientsLoaded: false,
    clientCriteria: action.payload
});

const loadClientsFail = (state: ClientState, action: LoadClientsFail): ClientState => ({
    ...state,
    clientsLoading: false,
    clientsLoaded: false
});

const loadClientsSuccess = (state: ClientState, action: LoadClientsSuccess): ClientState => ({
    ...state,
    clientsLoading: false,
    clientsLoaded: true,
    clients: action.payload
});

const loadClient = (state: ClientState, action: LoadClient): ClientState => ({
    ...state,
    clientLoading: true,
    clientLoaded: false
});

const loadClientFail = (state: ClientState, action: LoadClientFail): ClientState => ({
    ...state,
    clientLoading: false,
    clientLoaded: false
});

const loadClientSuccess = (state: ClientState, action: LoadClientSuccess): ClientState => ({
    ...state,
    clientLoading: false,
    clientLoaded: true,
    client: action.payload
});

const saveClient = (state: ClientState, action: SaveClient): ClientState => ({
    ...state,
    clientSaving: true,
    clientSaved: false
});

const saveClientFail = (state: ClientState, action: SaveClientFail): ClientState => ({
    ...state,
    clientSaving: false,
    clientSaved: false
});

const saveClientSuccess = (state: ClientState, action: SaveClientSuccess): ClientState => ({
    ...state,
    clientSaving: false,
    clientSaved: true
});

const deleteClient = (state: ClientState, action: DeleteClient): ClientState => ({
    ...state,
    clientDeleting: true,
    clientDeleted: false
});

const deleteClientFail = (state: ClientState, action: DeleteClientFail): ClientState => ({
    ...state,
    clientDeleting: false,
    clientSaved: false
});

const deleteClientSuccess = (state: ClientState, action: DeleteClientSuccess): ClientState => ({
    ...state,
    clientDeleting: false,
    clientDeleted: true
});

// tslint:disable-next-line:cyclomatic-complexity
export function clientReducer(
    state: ClientState = initialState,
    action: ClientAction
): ClientState {
    switch (action.type) {
        case ClientActionTypes.LOAD_CLIENT_MODELS:
            return loadClients(state, action);
        case ClientActionTypes.LOAD_CLIENT_MODELS_FAIL:
            return loadClientsFail(state, action);
        case ClientActionTypes.LOAD_CLIENT_MODELS_SUCCESS:
            return loadClientsSuccess(state, action);
        case ClientActionTypes.LOAD_CLIENT_MODEL:
            return loadClient(state, action);
        case ClientActionTypes.LOAD_CLIENT_MODEL_FAIL:
            return loadClientFail(state, action);
        case ClientActionTypes.LOAD_CLIENT_MODEL_SUCCESS:
            return loadClientSuccess(state, action);
        case ClientActionTypes.SAVE_CLIENT_MODEL:
            return saveClient(state, action);
        case ClientActionTypes.SAVE_CLIENT_MODEL_FAIL:
            return saveClientFail(state, action);
        case ClientActionTypes.SAVE_CLIENT_MODEL_SUCCESS:
            return saveClientSuccess(state, action);
        case ClientActionTypes.DELETE_CLIENT_MODEL:
            return deleteClient(state, action);
        case ClientActionTypes.DELETE_CLIENT_MODEL_FAIL:
            return deleteClientFail(state, action);
        case ClientActionTypes.DELETE_CLIENT_MODEL_SUCCESS:
            return deleteClientSuccess(state, action);
        default:
            return state;
    }
}
