import { Client } from 'src/app/client/types/client.interface';
import {
    LoadClients,
    LoadClientsFail,
    LoadClientsSuccess,
    SharedAction,
    SharedActionTypes
} from '../actions/shared.actions';

export interface SharedState {
    clients: Client[];
    clientsLoaded: boolean;
    clientsLoading: boolean;
}

const initialState: SharedState = {
    clients: [],
    clientsLoaded: false,
    clientsLoading: false
};

const loadClients = (state: SharedState, action: LoadClients): SharedState => ({
    ...state,
    clientsLoading: true,
    clientsLoaded: false
});

const loadClientsFail = (state: SharedState, action: LoadClientsFail): SharedState => ({
    ...state,
    clientsLoading: false,
    clientsLoaded: false
});

const loadClientsSuccess = (state: SharedState, action: LoadClientsSuccess): SharedState => ({
    ...state,
    clientsLoading: false,
    clientsLoaded: true,
    clients: action.payload
});

export function sharedReducer(
    state: SharedState = initialState,
    action: SharedAction
): SharedState {
    switch (action.type) {
        case SharedActionTypes.LOAD_CLIENTS:
            return loadClients(state, action);
        case SharedActionTypes.LOAD_CLIENTS_FAIL:
            return loadClientsFail(state, action);
        case SharedActionTypes.LOAD_CLIENTS_SUCCESS:
            return loadClientsSuccess(state, action);
        default:
            return state;
    }
}
