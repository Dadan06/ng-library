import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationState } from 'src/app/authentication/store/reducers/authentication.reducers';
import { go } from 'src/app/shared/utils/go.utils';
import { CLIENT_BASE_ROUTE } from '../../constants/client.constants';
import { SaveClient } from '../../store/actions/client.actions';
import { ClientState } from '../../store/reducers/client.reducers';
import {
    getClient,
    getClientEditEnabled,
    getClientEditing
} from '../../store/selectors/client.selectors';
import { Client } from '../../types/client.interface';

@Component({
    selector: 'app-client-form-root',
    templateUrl: './client-form-root.component.html',
    styleUrls: ['./client-form-root.component.scss']
})
export class ClientFormRootComponent implements OnInit {
    client$: Observable<Client>;
    isEditing$: Observable<boolean>;
    clientEditEnabled$: Observable<boolean>;

    constructor(
        private clientStore: Store<ClientState>,
        private authenticationStore: Store<AuthenticationState>
    ) {}

    ngOnInit() {
        this.client$ = this.clientStore.pipe(select(getClient));
        this.isEditing$ = this.clientStore.pipe(select(getClientEditing));
        this.clientEditEnabled$ = this.authenticationStore.pipe(select(getClientEditEnabled));
    }

    onEdit(client: Client) {
        go(this.clientStore, [`${CLIENT_BASE_ROUTE}/edit`, client._id]);
    }

    onSave(client: Client) {
        this.clientStore.dispatch(new SaveClient(client));
    }

    onCancelEdit(client: Client) {
        go(
            this.clientStore,
            client._id ? [`${CLIENT_BASE_ROUTE}/detail`, client._id] : [`${CLIENT_BASE_ROUTE}`]
        );
    }

    onClose() {
        go(this.clientStore, [`${CLIENT_BASE_ROUTE}`]);
    }
}
