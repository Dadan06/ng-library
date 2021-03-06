import { Component, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ModalComponent } from 'angular-custom-modal';
import * as cloneDeep from 'lodash/cloneDeep';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { ListCriteria } from 'src/app/shared/types/list-criteria.interface';
import { Page } from 'src/app/shared/types/page.interface';
import { Sort } from 'src/app/shared/types/sort.interface';
import { go } from 'src/app/shared/utils/go.utils';
import { subscribeModal } from 'src/app/shared/utils/modal.utils';
import { CLIENT_BASE_ROUTE, CLIENT_DEFAULT_CRITERIA } from '../../constants/client.constants';
import { DeleteClient, LoadClients } from '../../store/actions/client.actions';
import { ClientState } from '../../store/reducers/client.reducers';
import {
    getClient,
    getClientCreateEnabled,
    getClientDeleteEnabled,
    getClientEditEnabled,
    getClients,
    getClientSaved,
    getClientsLoading,
    getClientsTotalItems,
    getIsEditingOrDetail
} from '../../store/selectors/client.selectors';
import { Client } from '../../types/client.interface';

@Component({
    selector: 'app-client-root',
    templateUrl: './client-root.component.html',
    styleUrls: ['./client-root.component.scss']
})
export class ClientRootComponent implements OnInit {
    clients$: Observable<Client[]>;
    clientsLoading$: Observable<boolean>;
    clientEditEnabled$: Observable<boolean>;
    clientDeleteEnabled$: Observable<boolean>;
    clientCreateEnabled$: Observable<boolean>;
    isEditingOrDetail$: Observable<boolean>;
    totalItems$: Observable<number>;
    currentClient$: Observable<Client>;
    clientCriteria: ListCriteria = cloneDeep(CLIENT_DEFAULT_CRITERIA);
    toBeDeletedClient: Client;

    @ViewChild('deletionConfirmModal') deletionConfirmModal: ModalComponent;
    @ViewChild('successfullSavingModal') successfullSavingModal: ModalComponent;

    constructor(
        private clientStore: Store<ClientState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.clients$ = this.clientStore.pipe(select(getClients));
        this.clientsLoading$ = this.clientStore.pipe(select(getClientsLoading));
        this.totalItems$ = this.clientStore.pipe(select(getClientsTotalItems));
        this.isEditingOrDetail$ = this.clientStore.pipe(select(getIsEditingOrDetail));
        this.clientEditEnabled$ = this.authenticationStore.pipe(select(getClientEditEnabled));
        this.clientDeleteEnabled$ = this.authenticationStore.pipe(select(getClientDeleteEnabled));
        this.clientCreateEnabled$ = this.authenticationStore.pipe(select(getClientCreateEnabled));
        this.currentClient$ = this.clientStore.pipe(select(getClient));
        this.subscribeModals();
    }

    onSort(sort: Sort) {
        this.clientCriteria.sort = sort;
        this.refreshList();
    }

    onSearch(search: string) {
        this.clientCriteria.search = search;
        this.refreshList();
    }

    onViewDetail(client: Client) {
        go(this.clientStore, [`${CLIENT_BASE_ROUTE}/detail`, client._id]);
    }

    onEdit(client: Client) {
        go(this.clientStore, [`${CLIENT_BASE_ROUTE}/edit`, client._id]);
    }

    onDelete(client: Client) {
        this.toBeDeletedClient = client;
        this.deletionConfirmModal.open();
    }

    onPaginate(page: Page) {
        this.clientCriteria.page = page;
        this.refreshList();
    }

    onCreate() {
        go(this.clientStore, [`${CLIENT_BASE_ROUTE}/new`]);
    }

    onConfirmDeletion() {
        this.clientStore.dispatch(new DeleteClient(this.toBeDeletedClient));
    }

    private subscribeModals() {
        subscribeModal(this.clientStore, getClientSaved, true, this.successfullSavingModal);
    }

    private refreshList() {
        this.clientStore.dispatch(new LoadClients({ ...this.clientCriteria }));
    }
}
