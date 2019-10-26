import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { getUserPrivileges } from 'src/app/authentication/store/selectors/authentication.selectors';
import { UserPrivileges } from 'src/app/role/constants/privilege.constants';
import { Privilege } from 'src/app/role/types/privilege.interface';
import { Paginated } from 'src/app/shared/types/paginated.interface';
import { AppRouterState } from '../../../core/store/reducers/router.reducers';
import { getRouterState } from '../../../core/store/selectors/router.selectors';
import { Client } from '../../types/client.interface';
import { ClientState } from '../reducers/client.reducers';

export const getClientState = createFeatureSelector<ClientState>('client');

export const getPaginatedClients = createSelector(
    getClientState,
    (state: ClientState) => state.clients
);

export const getClients = createSelector(
    getPaginatedClients,
    (paginatedClients: Paginated<Client>) => paginatedClients.items
);

export const getClientsTotalItems = createSelector(
    getPaginatedClients,
    (paginatedClients: Paginated<Client>) => paginatedClients.totalItems
);

export const getClientCriteria = createSelector(
    getClientState,
    (state: ClientState) => state.clientCriteria
);

export const getClientsLoading = createSelector<ClientState, ClientState, boolean>(
    getClientState,
    (state: ClientState) => state.clientsLoading
);

export const getClient = createSelector(
    getClientState,
    (state: ClientState) => state.client
);

export const getClientLoading = createSelector<ClientState, ClientState, boolean>(
    getClientState,
    (state: ClientState) => state.clientLoading
);

export const getClientSaving = createSelector<ClientState, ClientState, boolean>(
    getClientState,
    (state: ClientState) => state.clientSaving
);

export const getClientSaved = createSelector<ClientState, ClientState, boolean>(
    getClientState,
    (state: ClientState) => state.clientSaved
);

export const getClientEditEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.EDIT_CLIENT)
);

export const getClientDeleteEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.DELETE_CLIENT)
);

export const getClientCreateEnabled = createSelector<AuthenticationState, Privilege[], boolean>(
    getUserPrivileges,
    (privileges: Privilege[]) => privileges.some(p => p.name === UserPrivileges.CREATE_CLIENT)
);

export const getClientEditing = createSelector<
    ClientState,
    RouterReducerState<AppRouterState>,
    boolean
>(
    getRouterState,
    router => router.state.url.includes('client/edit') || router.state.url.includes('client/new')
);
